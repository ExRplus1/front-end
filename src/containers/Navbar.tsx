import { NavBarContainer, Link, Text, ConnectWallet } from "../styles";
import { connectMetamask } from "../services/metamaskServices";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useAppContext } from "../hooks/useAppContext";

const Navbar = () => {
  const { metamaskAccountAddress, setMetamaskAccountAddress } = useAppContext();

  const [warn, setWarn]: [warn: any, setWarn: Dispatch<SetStateAction<any>>] =
    useState(null);

  useEffect(() => {
    // const chainId = process.env.REACT_APP_CHAIN_ID;
    const { ethereum } = window as any;
    if (!ethereum) {
      setWarn("Metamask is not installed! Go install the extension!");
    } else {
      //@ts-ignore
      const windowReload = (chainId) => window.location.reload();
      ethereum.on("chainChanged", windowReload);
      return () => ethereum.removeListener("chainChanged", windowReload);
    }
  }, [metamaskAccountAddress]);

  const retrieveWalletAddress = async () => {
    const addresses = await connectMetamask();
    if (addresses) {
      setMetamaskAccountAddress(addresses[0]);
      console.log(addresses[0]);
    }
  };

  return (
    <NavBarContainer>
      <div
        style={{
          display: "flex",
        }}
      >
        <Link>
          <Text> Link 1</Text>
        </Link>
        <Link>
          <Text> Link 2</Text>
        </Link>
        <Link>
          <Text> Link 3</Text>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexGrow: 1,
        }}
      >
        {warn ? (
          <Text>This website requires Metamask wallet</Text>
        ) : (
          <ConnectWallet type="white" onClick={retrieveWalletAddress}>
            <Text>
              {metamaskAccountAddress === ""
                ? "Connect to MetaMask"
                : `Connected to: ${metamaskAccountAddress.substring(0, 8)}...`}
            </Text>
          </ConnectWallet>
        )}
      </div>
    </NavBarContainer>
  );
};

export default Navbar;
