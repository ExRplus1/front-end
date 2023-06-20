
import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { upload } from "@spheron/browser-upload";
import { ethers } from "ethers";
import { ContractFactory } from 'ethers';
import Surveys from "../contracts/Surveys.json"
import Badges from "../contracts/Badge.json"
import climateJson from "../stubs/climate-survey.json";

import CID from "cids"
import axios from "axios";
import bs58 from 'bs58';
import { Buffer } from "buffer";

// blockchain

// connect to Metamask
const connect = async () => {
    try {
        const { ethereum } = window as any;
        switchToHederaNetwork(ethereum)
        let provider;
        if (!ethereum) {
            console.log("MetaMask not installed; using read-only defaults");
            provider = new ethers.JsonRpcProvider(process.env.REACT_APP_RPC_URL)
        } else {
            provider = new ethers.BrowserProvider(ethereum)
        }
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

export const connectMM = async () => {
    try {
        const { address } = await connect() as any;
        return address
    } catch (e) {
        console.log("[ERROR THROW::]", e)
    }
}


export const disconnectMM = async () => {
    try {
        const { ethereum, provider } = await connect() as any;

        if (!ethereum) {
            throw new Error("Metamask is not installed! Go install the extension!");
        }
        const accounts = await ethereum.request({
            method: "wallet_requestPermissions",
            params: [{
                eth_accounts: {}
            }]
        }).then(() => ethereum.request({
            method: 'eth_requestAccounts'
        }))


    } catch (e) {
        console.log("[ERROR THROW::]", e)
    }
}


// utilities
export const deployContracts = async (abi?: any, byteCode?: any) => {
    abi = Surveys.abi;
    byteCode = Surveys.bytecode;
    // abi = Badges.abi;
    // byteCode = Badges.bytecode;

    try {
        const { provider, signer } = await connect() as any;
        const factory = new ContractFactory(abi, byteCode, signer);
        // If contract requires constructor args, can specify them here
        const contract = await factory.deploy();
        console.log(await contract.getAddress());
        console.log(contract.deploymentTransaction());
    } catch (e) {
        console.log(e)
    }
}

const instantiateContract = async () => {
    const abi = Surveys.abi;
    const contractAddress = '0xd094c7a494e1f8d0f93bc02e1557664f74952a9e'
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

// value(the survey creation cost) is hardcoded as 300 and surveyJson as climateJson
export const deploySurvey = async (surveyJson?: any, surveyValue?: string) => {
    try {

        // remove after survey creation
        surveyJson = climateJson;
        // remove 

        // let IPFSUploadToken = await uploadFileToSpheron(surveyJson) as string;
        let IPFSUploadToken = await uploadFileToPinata(surveyJson);
        if (IPFSUploadToken.length === 0) {
            throw new Error("IPFS problems!!")
        }

        // console.log("IPFS Token::", IPFSUploadToken);

        const cid = encodeCIDtoBytes32(IPFSUploadToken)

        const contract = await instantiateContract()
        const createSurvey = await contract.setSurvey(
            cid,
            {
                value: ethers.parseUnits(surveyValue as string),
                gasPrice: 0x1fffffffffff,
            })
        console.log(createSurvey)
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

        console.log(filteredSurveys.map((cid:string) => `${endPoint}${cid}`))

        return ;

    } catch (e) {
        console.log(e)
    }
}



/**
 --- Survey.json
 1. Get hash from Spheron(IPFS) and generate Survey' hash to be write on blockchain
 2. Get SurveyHash from blockchain and fetch the data from Spheron(IPFS) 
 3. Write Answers to Spheron, get the hash and write in blockchain 
 4. Mint the NFT and transfer it to the user
 */



// Pinata
const uploadFileToPinata = async (survey?: any) => {
    try {

        const config = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
            },
            data: JSON.stringify(survey)
        };

        const { data } = await axios(config);
        return data.IpfsHash;

    } catch (error) {
        console.log("Error sending File to IPFS: ")
        console.log(error)
    }
}


const fetchIPFSFile = (cid: string) => {
    return axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`)
}

//SPHERON 
const createFileFromJson = (obj: Object) => {
    const json = JSON.stringify(obj);
    const blob = new Blob([json], { type: "application/json" });
    const file = new File([blob], "survey.json", {
        type: "application/json",
    });

    return file;
};

const uploadFileToSpheron = async (surveyJson: any) => {
    const SE_URL = `${process.env.REACT_APP_API_URL}/initiate-upload`;

    const name = "climate-change";
    const blobSurvey = createFileFromJson(surveyJson);

    try {
        const responseMeta = await fetch(`${SE_URL}/${name}-survey`);
        const responseMetaJson = await responseMeta.json();
        const uploadMetaResult = await upload([blobSurvey], {
            token: responseMetaJson.uploadToken,
        });
        //   console.log({...uploadMetaResult});
        //, "link creation:: https://${uploadMetaResult.dynamicLinks[0]}/survey.json");
        return (uploadMetaResult.cid)
    } catch (err) {
        console.log(err);
    } finally {
    }
};
