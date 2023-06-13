import { createContext, useState, ReactNode, useContext } from "react";

const AppContext = createContext({
  metamaskAccountAddress: "",
  setMetamaskAccountAddress: (newValue: string) => {},
});

const AppContextProvider = ({
  children,
}: {
  children: ReactNode | undefined;
}) => {
  const [metamaskAccountAddress, setMetamaskAccountAddress] = useState("");

  return (
    <AppContext.Provider
      value={{ metamaskAccountAddress, setMetamaskAccountAddress }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppContextProvider, useAppContext };
