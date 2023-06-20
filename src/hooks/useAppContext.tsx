import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  SetStateAction,
} from "react";

interface AppContextInterface {
  metamaskAccountAddress: string;
  setMetamaskAccountAddress: React.Dispatch<SetStateAction<string | any>>;
  metamaskConnected: boolean;
  setMetamaskConnected: React.Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextInterface>({
  metamaskAccountAddress: "",
  setMetamaskAccountAddress: () => {},
  metamaskConnected: false,
  setMetamaskConnected: () => {},
});

const AppContextProvider = ({
  children,
}: {
  children: ReactNode | undefined;
}) => {
  const [metamaskAccountAddress, setMetamaskAccountAddress] = useState('');
  const [metamaskConnected, setMetamaskConnected] = useState(false);

  return (
    <AppContext.Provider
      value={{
        metamaskAccountAddress,
        setMetamaskAccountAddress,
        metamaskConnected,
        setMetamaskConnected,
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
