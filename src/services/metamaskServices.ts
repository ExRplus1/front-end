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

export const connectMetamask = async () => {
    try {
        const { ethereum } = window as any;
        let accounts: string[] = []
        if (!ethereum) {
            throw new Error("Metamask is not installed! Go install the extension!");
        }

        await switchToHederaNetwork(ethereum);

        accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        return accounts;
    } catch (e) {
        console.log("[ERROR THROW::]", e)
    }
}