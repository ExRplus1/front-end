import { ethers, ContractFactory } from 'ethers';
import Surveys from "../contracts/Surveys.json"

import axios from "axios";
import bs58 from 'bs58';
import { Buffer } from "buffer";

import { surveysContractAddress, operatorAccountAddress } from './contracts';
// blockchain

export const exchangeRate = async () => {
    try {
        const { data } = await axios.get('https://mainnet-public.mirrornode.hedera.com/api/v1/network/exchangerate');
        const { cent_equivalent, hbar_equivalent } = data.current_rate;
        const HbarPriceInUSD: number = Math.round(cent_equivalent / hbar_equivalent * 100) / 1e4
        return HbarPriceInUSD
    } catch (e) {

    }
}

// connect to Metamask
const connect = async () => {
    try {
        const { ethereum } = window as any;
        if (!ethereum) {
            alert('Get Metamask!')
            console.log("MetaMask not installed; using read-only defaults");
            return;
        }
        let provider;
        switchToHederaNetwork(ethereum)
        provider = new ethers.BrowserProvider(ethereum)
        await provider.send('eth_requestAccounts', []);
        const accounts = await provider.listAccounts();
        const { address } = accounts[0]
        const signer = await provider.getSigner(address);
        // console.log(ethereum, provider, signer, address)
        return ({ ethereum, provider, signer, address })
    } catch (e) {
        console.log(e)
    }
}

const switchToHederaNetwork = async (ethereum: any) => {
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: process.env.REACT_APP_CHAIN_ID }] // chainId must be in hexadecimal numbers!!
        });
    } catch (error: any) {
        if (error.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainName: process.env.REACT_APP_CHAIN_NAME,
                            chainId: process.env.REACT_APP_CHAIN_ID,
                            nativeCurrency: {
                                name: 'HBAR',
                                symbol: 'HBAR',
                                decimals: 18
                            },
                            rpcUrls: [process.env.REACT_APP_RPC_URL]
                        },
                    ],
                });
            } catch (addError) {
                console.error(addError);
            }
        }
        console.error(error);
    }
}

export const connectWallet = async () => {
    try {
        const { address } = await connect() as any;
        return address
    } catch (e) {
        console.log("[ERROR THROW::]", e)
    }
}

// Unused because Metamask' HSON-RPC API don't allow to 'really' disconect 
export const disconnectWallet = async () => {
    try {
        const { ethereum } = await connect() as any;
        if (!ethereum) {
            throw new Error("Metamask is not installed! Go install the extension!");
        }
        await ethereum.request({
            method: "wallet_requestPermissions",
            params: [{
                eth_accounts: {}
            }]
        });
        window.location.reload();
    } catch (e) {
        console.log("[ERROR THROW::]", e)
    }
}


// TODO :: MOVE THIS IN HARDHAT
export const deployContracts = async (abi?: any, byteCode?: any) => {
    abi = Surveys.abi;
    byteCode = Surveys.bytecode;

    try {
        const { provider, signer } = await connect() as any;
        const factory = new ContractFactory(abi, byteCode, signer);
        // If contract requires constructor args, can specify them here
        const contract = await factory.deploy(operatorAccountAddress);
        console.log(await contract.getAddress());
        console.log(contract.deploymentTransaction());
    } catch (e) {
        console.log(e)
    }
}

const instantiateContract = async () => {
    const abi = Surveys.abi;
    const contractAddress = surveysContractAddress //process.env.REACT_APP_SURVEYS_CONTRACT as string;
    const { provider, signer, address } = await connect() as any;
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract
}

//abi functions call

const encodeCIDtoBytes32 = (IPFSUploadToken: string) => {
    const cidHex = bs58.decode(IPFSUploadToken)
    // console.log(cidHex.slice(0, 4), cidHex.slice(4));
    const cid = ethers.hexlify(cidHex.slice(2));
    // console.log("CID::", cid)
    return cid;
}

const decodeCIDfromBytes32 = (cid: string) => {
    const cidBytes = ethers.getBytes(cid);
    const newA = new Uint8Array(cidBytes.length + 2);
    newA.set([18, 32], 0);
    newA.set(cidBytes, 2);
    const revertedCid = bs58.encode(Buffer.from(newA));
    console.log("RevertedCID::", revertedCid)
    return revertedCid;
}

export const execute = async (type: string, jsonObj: any, value: string, survey?: string) => {
    try {

        let IPFSUploadToken = await uploadFileToIPFS(jsonObj);
        if (IPFSUploadToken.length === 0) {
            throw new Error("IPFS service problems!!")
        }
        // console.log("IPFS Token::", IPFSUploadToken);

        const CID = encodeCIDtoBytes32(IPFSUploadToken)
        const contract = await instantiateContract()


        switch (type) {
            case 'survey':
                const setSurvey = await contract.setSurvey(
                    CID,
                    {
                        value: ethers.parseUnits(value as string),
                        gasPrice: 0x1fffffffffffff,
                    })
                break;
            case 'answers': {
                const surveyCID = encodeCIDtoBytes32(survey as string);
                const setAnswers = await contract.setAnswer(
                    CID,
                    surveyCID,
                    [Buffer.from(IPFSUploadToken)],
                    {
                        value: ethers.parseEther(value as string),
                        gasPrice: 0x2fffffffffff,
                    })
                    console.log(setAnswers)
                break;
            }
            default:
        }
        return IPFSUploadToken;
    } catch (e) {
        console.log(e)
    }
}

export const getAuthorSurveys = async () => {
    const contract = await instantiateContract()
    const surveyAuthor = await contract.getAuthorSurveys({
        gasPrice: 0x1fffffffff,
    })

    console.log(surveyAuthor.map((x: any) => ethers.decodeBytes32String(x[0])).filter((_: any) => _ !== ""))
}

export const getSurveys = async () => {
    try {
        const contract = await instantiateContract()
        const surveys = await contract.getSurveys({
            gasPrice: 0x1fffffffff,
        })

        const endPoint = 'https://gateway.pinata.cloud/ipfs/';
        const headers = {
            'Authorization': `Bearer ${process.env.REACT_APP_PINATA_JWT}`
        };

        const filteredSurveys = surveys.map((survey: any) => decodeCIDfromBytes32(survey[0])).filter((cid: any) => cid !== "")
        // const mappedSurveys = filteredSurveys.map((cid: any) => axios.get(`${endPoint}${cid}`, { headers }))

        // const fetchedSurveys = await Promise.all(mappedSurveys);

        console.log(filteredSurveys.map((cid: string) => `${endPoint}${cid}`))

        return;

    } catch (e) {
        console.log(e)
    }
}


export const getBadgesOfAddress = async () => {
    const contract = await instantiateContract()
    const badges = await contract.getBadgesOfAddress({
        gasPrice: 0x1fffffffff,
    })

    console.log(badges.map((x: any) => parseInt(x)))
}


export const getAnswers = async () => {
    const contract = await instantiateContract()
    const qry = await contract.getAnswers({
        gasPrice: 0x1fffffffff,
    })

    const q = qry.map((x: any) => decodeCIDfromBytes32(x[0]))
    console.log("sss", q)
}

export const getUserAnswers = async () => {
    const contract = await instantiateContract()
    const qry = await contract.getUserAnswers({
        gasPrice: 0x1fffffffff,
    })

    console.log(qry)
}

export const getAnswer = async () => {
    const contract = await instantiateContract()
    const id = 1;
    const qry = await contract.getUserAnswers({
        id,
        gasPrice: 0x1fffffffff,
    })

    console.log([...qry])
}

export const getBalance = async () => {
    const contract = await instantiateContract()
    const qry = await contract.getBalance({
        gasPrice: 0x1fffffffff,
    })

    console.log(qry)
}


/** testing */

export const createNft = async () => {
    const contract = await instantiateContract()
    const qry = await contract.createNft(
        '0.0.1013',
        [Buffer.from("leonard")],
        {
            value: '100',
            gasPrice: 0x1ffffffffff,
        })

}


/** testing */


// TODO - Move to backend
const uploadFileToIPFS = async (file?: any) => {
    try {
        const config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
            },
            data: JSON.stringify(file)
        };

        const { data } = await axios(config);
        return data.IpfsHash;

    } catch (error) {
        console.log("Error sending File to IPFS: ")
        console.log(error)
    }
}


// TODO - Move to backend
const fetchIPFSFile = (cid: string) => {
    return axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`)
}
