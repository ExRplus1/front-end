import { ethers, ContractFactory } from "ethers";
import Surveys from "../contracts/Surveys.json";

import axios from "axios";
import bs58 from "bs58";
import { Buffer } from "buffer";

const gasPrice = 10000000000000;
const gasLimit = 10000000;

// blockchain
export const exchangeRate = async () => {
  try {
    const { data } = await axios.get(
      "https://mainnet-public.mirrornode.hedera.com/api/v1/network/exchangerate"
    );
    const { cent_equivalent, hbar_equivalent } = data.current_rate;
    const HbarPriceInUSD: number =
      Math.round((cent_equivalent / hbar_equivalent) * 100) / 1e4;
    return HbarPriceInUSD;
  } catch (e) {
    console.log(e);
  }
};

// connect to Metamask
const connect = async () => {
  try {
    const { ethereum } = window as any;
    if (!ethereum) {
      alert("Get Metamask!");
      console.log("MetaMask not installed; using read-only defaults");
      return;
    }
    let provider;
    switchToHederaNetwork(ethereum);
    provider = new ethers.BrowserProvider(ethereum);
    await provider.send("eth_requestAccounts", []);
    const accounts = await provider.listAccounts();
    const { address } = accounts[0];
    const signer = await provider.getSigner(address);
    // console.log(ethereum, provider, signer, address)
    return { ethereum, provider, signer, address };
  } catch (e) {
    console.log(e);
  }
};

const switchToHederaNetwork = async (ethereum: any) => {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: process.env.REACT_APP_CHAIN_ID }], // chainId must be in hexadecimal numbers!!
    });
  } catch (error: any) {
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: process.env.REACT_APP_CHAIN_NAME,
              chainId: process.env.REACT_APP_CHAIN_ID,
              nativeCurrency: {
                name: "HBAR",
                symbol: "HBAR",
                decimals: 18,
              },
              rpcUrls: [process.env.REACT_APP_RPC_URL],
            },
          ],
        });
      } catch (addError) {
        console.error(addError);
      }
    }
    console.error(error);
  }
};

export const connectWallet = async () => {
  try {
    const { address } = (await connect()) as any;
    return address;
  } catch (e) {
    console.log("[ERROR THROW::]", e);
  }
};

// Unused because Metamask' HSON-RPC API don't allow to 'really' disconect
export const disconnectWallet = async () => {
  try {
    const { ethereum } = (await connect()) as any;
    if (!ethereum) {
      throw new Error("Metamask is not installed! Go install the extension!");
    }
    await ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    window.location.reload();
  } catch (e) {
    console.log("[ERROR THROW::]", e);
  }
};

// TODO :: MOVE THIS IN ADMIN/DASHBOARD or in HARDHAT
export const deployContracts = async (abi?: any, byteCode?: any) => {
  abi = Surveys.abi;
  byteCode = Surveys.bytecode;

  try {
    const { signer } = (await connect()) as any;
    const factory = new ContractFactory(abi, byteCode, signer);
    const estimatedGas = await signer.estimateGas(
      factory.getDeployTransaction(process.env.REACT_APP_OPERATOR_ACCOUNT)
    );
    console.log(estimatedGas.data);
    // If contract requires constructor args, can specify them here
    const contract = await factory.deploy(
      process.env.REACT_APP_OPERATOR_ACCOUNT
    );
    const address = await contract.getAddress();
    const tx = contract.deploymentTransaction();
    console.log(address, tx);
  } catch (e) {
    console.log(e);
  }
};

const instantiateContract = async (contractAddress?: any, abi?: any) => {
  abi = abi || Surveys.abi;
  contractAddress =
    contractAddress || (process.env.REACT_APP_SURVEYS_CONTRACT as string);
  const { signer } = (await connect()) as any;
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
};

/** Call contracts without Metamask signing */
// const instantiateSignedContract = async () => {
//     const abi = Surveys.abi;
//     const contractAddress = surveysContractAddress //process.env.REACT_APP_SURVEYS_CONTRACT as string;
//     const { provider, signer, address } = await connect() as any;
//     const privateKey = //process.env.REACT_APP_PRIVATE_KEY as string;
//     const wallet = new ethers.Wallet(privateKey, provider);
//     const contract = new ethers.Contract(contractAddress, abi, wallet);

//     return contract;
// }

//abi functions call

const encodeCIDtoBytes32 = (IPFSUploadToken: string) => {
  const cidHex = bs58.decode(IPFSUploadToken);
  // console.log(cidHex.slice(0, 4), cidHex.slice(4));
  const cid = ethers.hexlify(cidHex.slice(2));
  // console.log("CID::", cid)
  return cid;
};

const decodeCIDfromBytes32 = (cid: string) => {
  const cidBytes = ethers.getBytes(cid);
  const newA = new Uint8Array(cidBytes.length + 2);
  newA.set([18, 32], 0);
  newA.set(cidBytes, 2);
  const revertedCid = bs58.encode(Buffer.from(newA));
  // console.log("RevertedCID::", revertedCid)
  return revertedCid;
};

export const execute = async (
  type: string,
  jsonObj: any,
  value: string,
  survey?: string,
  noOfUsers?: number
) => {
  try {
    let IPFSUploadToken = await uploadFileToIPFS(jsonObj);
    if (IPFSUploadToken.length === 0) {
      throw new Error("IPFS service problems!!");
    }
    // console.log("IPFS Token::", IPFSUploadToken);

    const CID = encodeCIDtoBytes32(IPFSUploadToken);
    const contract = await instantiateContract();

    let qry;
    switch (type) {
      case "survey":
        qry = await contract.setSurvey(CID, noOfUsers, {
          value: ethers.parseUnits(value as string),
          gasPrice,
          gasLimit,
        });
        break;
        case "answers": {
        console.log("Answers", type, jsonObj, value, survey, noOfUsers);
        const surveyCID = encodeCIDtoBytes32(survey as string);
        qry = await contract.setAnswer(
          surveyCID,
          CID,
          [Buffer.from(IPFSUploadToken)],
          {
            value: ethers.parseEther(value as string),
            gasPrice,
            gasLimit,
          }
        );
        break;
      }
      default:
    }
    const receipt = await qry.wait();
    console.log(receipt)
    return receipt;
  } catch (e) {
    console.log(e);
  }
};

export const getAuthorSurveys = async () => {
  const contract = await instantiateContract();
  const surveyAuthor = await contract.getAuthorSurveys();
  const aS = surveyAuthor
    .map((x: any) => ethers.decodeBytes32String(x[0]))
    .filter((_: any) => _ !== "");
  return aS;
};

export const getSurveys = async () => {
  try {
    const contract = await instantiateContract();
    const r = await contract.getSurveys();
    const dR = r.map((x: any) => {
      const s = [...x];
      s[0] = decodeCIDfromBytes32(s[0]);
      return s;
    });
    console.log(dR)

    return dR;
  } catch (e) {
    console.log(e);
  }
};

/** 
 * @return [
        bytes32 surveyHash;
        bytes32 answerHash;
        address userAddress;
        int64   nftSerial;
    ]
*/
export const getUserAnswers = async () => {
  try {
    const c = await instantiateContract();
    const r = await c.getUserAnswers();
    // console.log(r)
    const dR = r.map((x: any) => {
      const s = [...x];
      s[0] = decodeCIDfromBytes32(s[0]);
      s[1] = decodeCIDfromBytes32(s[1]);
      return s;
    });
    return dR;
  } catch (error) {
    console.log(error);
  }
};

export const getNftAddressForSurveyHash = async (survey: string) => {
  try {
    const c = await instantiateContract();
    const r = await c.getNftAddressForSurveyHash(encodeCIDtoBytes32(survey));
    return r;
  } catch (error) {
    console.log(error);
  }
};

export const getAnswerForSurvey = async (survey: string) => {
  try {
    const c = await instantiateContract();
    const r = await c.getUserAnswers();
    const dR = r.map((x: any) => {
      const s = [...x];
      s[0] = decodeCIDfromBytes32(s[0]);
      s[1] = decodeCIDfromBytes32(s[1]);
      return s;
    });
    return dR;
  } catch (error) {
    console.log(error);
  }
};

export const getBalance = async () => {
  try {
    const contract = await instantiateContract();
    const qry = await contract.getBalance();
    console.log(qry);
  } catch (e) {
    console.log(e);
  }
};

// export const associateNft = async (nftAddress: string) => {
//     try {
//         console.log("nftAddr ", nftAddress);
//         const contract = await instantiateContract(nftAddress, ['function associate()'])
//         const tx = await contract.associate();
//         const receipt = await tx.wait();
//         console.log("hash ", receipt.hash)
//         return receipt;
//     } catch (e) {
//         console.error(e)
//     }
// }

export const associateNft = async (nftAddress: string) => {
  try {
    const contract = await instantiateContract();
    const tx = await contract.associate(nftAddress, {
      gasPrice,
      gasLimit,
    });
    const receipt = await tx.wait();
    console.log("TX", tx, "RX", receipt);
    return receipt;
  } catch (e) {
    console.log(e);
  }
};

export const transferNft = async (nftAddress: string, nftSerial: number) => {
  try {
    const contract = await instantiateContract();
    const tx = await contract.transferNft(nftAddress, nftSerial, {
      gasPrice,
      gasLimit,
    });
    const receipt = await tx.wait();
    console.log("TX", tx, "RX", receipt);
  } catch (e) {
    console.error(e);
  }
};

// TODO - Move to backend
const uploadFileToIPFS = async (file?: any) => {
  try {
    const config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
      },
      data: JSON.stringify(file),
    };

    const { data } = await axios(config);
    return data.IpfsHash;
  } catch (error) {
    console.log("Error sending File to IPFS: ");
    console.log(error);
  }
};

// // TODO - Move to backend
// const fetchIPFSFile = (cid: string) => {
//   return axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`);
// };

/** testing */

// export const mintNft = async (nftAddress: string) => {
//     try {
//         const contract = await instantiateContract()
//         const qry = await contract.mintNft(
//             nftAddress,
//             [Buffer.from("Direct minted by front-end")],
//             {
//                 value: ethers.parseEther('2'),
//                 gasPrice,
//                 gasLimit
//             })
//         const receipt = await qry.wait();
//         console.log("NftMintedSerial::", receipt)
//     } catch (e) {
//         console.error(e)
//     }
// }

// export const tokenInfo = async (nftAddress: string, nftSerial: string) => {
//     try {
//         const contract = await instantiateContract()
//         const approved = await contract.getApprovedNft(nftAddress, nftSerial);
//         const owner = await contract.ownerOfNft(nftAddress, nftSerial);
//         // const nameOfNft = await contract.nameOfNft(nftAddress, nftSerial);
//         const symbol = await contract.symbolOfNft(nftAddress);
//         const uri = await contract.tokenURIOfNft(nftAddress, nftSerial);

//         console.log(owner, approved, symbol, uri);

//     } catch (e) {
//         console.log("TokenInfo::", e)
//     }
// }

/** testing */
