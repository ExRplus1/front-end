// import MetaMaskSDK
//     from "@metamask/sdk";

const provider = () => {
    try {
        const {ethereum} = window as any;
        const MMSDK = ethereum;
        return MMSDK;
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
        const ethereum = provider();

        if (!ethereum) {
            throw new Error("Metamask is not installed! Go install the extension!");
        }

        await switchToHederaNetwork(ethereum);

        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        }) as string[];

        const account = accounts[0]
        return account

    } catch (e) {
        console.log("[ERROR THROW::]", e)
    }
}


export const disconnectMM = async () => {
    try {
        const ethereum = provider();

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
