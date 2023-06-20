import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  SetStateAction,
  useEffect,
} from "react";

import { connectWallet } from "../services/utils";
import { exchangeRate } from "../services/utils";

interface AppContextInterface {
  metamaskAccountAddress: string;
  setMetamaskAccountAddress: React.Dispatch<SetStateAction<string | any>>;
  metamaskConnected: boolean;
  setMetamaskConnected: React.Dispatch<SetStateAction<boolean>>;
  connect: any;
  disconnect: any;
  exRate: number;
}

const AppContext = createContext<AppContextInterface>({
  metamaskAccountAddress: "",
  setMetamaskAccountAddress: () => {},
  metamaskConnected: false,
  setMetamaskConnected: () => {},
  connect: () => {},
  disconnect: () => {},
  exRate: 0,
});

const AppContextProvider = ({
  children,
}: {
  children: ReactNode | undefined;
}) => {
  const [metamaskAccountAddress, setMetamaskAccountAddress] = useState("");
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [exRate, setExRate] = useState(0);
  const { ethereum } = window as any;

  useEffect(() => {
    (async() => {
      const r = await exchangeRate() as number;
      setExRate(r);
    })()
  }, [])

  useEffect(() => {
    if (ethereum) {
      (async () => {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setMetamaskAccountAddress(accounts[0]);
          setMetamaskConnected(true);
        }

        ethereum.on("accountsChanged", (accounts: any) => {
          if(accounts.length > 0) {
            setMetamaskAccountAddress(accounts[0]);
            setMetamaskConnected(true);
          } else {
            setMetamaskAccountAddress('');
            setMetamaskConnected(false)
          }
        });

        ethereum.on("chainChanged", () => window.location.reload());
      })();
    } else {
      console.log("No metamask!");
    }
  }, [ethereum]);

  const connect = async () => {
    try {
      const currentAccount = await connectWallet();
      if (currentAccount) {
        setMetamaskAccountAddress(currentAccount);
        setMetamaskConnected(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const disconnect = async () => {
    try {
      setMetamaskAccountAddress("");
      setMetamaskConnected(false);
    } catch (e) {}
  };

  return (
    <AppContext.Provider
      value={{
        metamaskAccountAddress,
        setMetamaskAccountAddress,
        metamaskConnected,
        setMetamaskConnected,
        connect,
        disconnect,
        exRate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppContextProvider, useAppContext };
