// import MetaMaskSDK
//     from "@metamask/sdk";

import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { upload } from "@spheron/browser-upload";
import { ethers } from "ethers";
import { ContractFactory } from 'ethers';
import Surveys from "../contracts/Surveys.json"
import Badges from "../contracts/Badge.json"

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
        // await switchToHederaNetwork(ethereum);
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
    const contractAddress = '0xb285d9a812189b942929a342844a269c68b2829f'
    const { provider, signer, address } = await connect() as any;
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract
}

export const createHash = async (contractAddress?: any, abi?: any, functionName?: any, params?: any) => {
    try {

        const contract = await instantiateContract()

        const _a = ethers.encodeBytes32String("Leonard")
        const _b = ethers.encodeBytes32String("Lepadatu")
        const createHash = await contract.createHash(_a, _b, {
            value: 100_000,
            gasPrice: 100_000
        })

        console.log(createHash)
    } catch (e) {
        console.log(e)
    }
}

// value(the survey creation cost) is hardcoded 
export const createSurvey = async (surveyHash: string) => {
    try {

        const contract = await instantiateContract()

        surveyHash = ethers.encodeBytes32String(surveyHash);

        const createSurvey = await contract.setSurvey(
            surveyHash,
            {
                value: ethers.parseUnits('300'),
                gasPrice: 0x1ffffffffff,

            })

        console.log(createSurvey)
    } catch (e) {
        console.log(e)
    }
}

export const getAuthorSurveys = async () => {
    const contract = await instantiateContract()
    const surveyAuthor = await contract.getAuthorSurveys({
        gasPrice: 0x1fffffff,
    })

    
    console.log(surveyAuthor.map((x:any) => ethers.decodeBytes32String(x[0])).filter((_:any) => _ !== ""))
}

export const getSurveys = async () => {
    const contract = await instantiateContract()
    const getSurveys = await contract.getSurveys({
        gasPrice: 0x1fffffff,
    })

    console.log(`Surveys ${getSurveys}`)

}

/**
 --- Survey.json
 1. Get hash from Spheron(IPFS) and generate Survey' hash to be write on blockchain
 2. Get SurveyHash from blockchain and fetch the data from Spheron(IPFS) 
 3. Write Answers to Spheron, get the hash and write in blockchain 
 4. Mint the NFT and transfer it to the user
 */