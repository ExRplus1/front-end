import { useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { ConnectWallet, Text } from "../styles";
import { connectMM, disconnectMM } from "../services/metamaskServices";

//hook
const useHover = () => {
  const [hovering, setHovering] = useState(false);
  const onHoverProps: {} = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
  };
  return [hovering, onHoverProps];
};

const Profile = () => {
  const {
    metamaskAccountAddress,
    setMetamaskAccountAddress,
    metamaskConnected,
    setMetamaskConnected,
  } = useAppContext();

  useEffect(() => {
    // console.log(metamaskConnected, metamaskAccountAddress);
    const {ethereum} = window as any;

    const windowReload = (chainId: any) => window.location.reload();
    ethereum?.on("chainChanged", windowReload);
    return () => ethereum?.removeListener("chainChanged", windowReload);
  }, [metamaskConnected]);

  const connect = async () => {
    const account = await connectMM();
    // console.log(account)
    if (account) {
      setMetamaskAccountAddress(account);
      setMetamaskConnected(true);
    }
  };

  const disconnect = async () => {
    await disconnectMM();
    setMetamaskAccountAddress('');
    setMetamaskConnected(false);
  };

  const [hovered, hoverProps] = useHover();

  return metamaskConnected ? (
    <ConnectWallet
      type="white"
      onClick={() => disconnect()}
      {...hoverProps}
      style={{ width: 350 }}
    >
      <Text>
        {hovered
          ? "Disconect"
          : `Connected to ${metamaskAccountAddress.slice(
              0,
              5
            )}...${metamaskAccountAddress.slice(-4)}`}
      </Text>
    </ConnectWallet>
  ) : (
    <ConnectWallet type="white" onClick={connect}>
      <Text>Connect to Metamask</Text>
    </ConnectWallet>
  );
};

export default Profile;
