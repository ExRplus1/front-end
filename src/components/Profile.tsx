import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { ConnectWallet, Text } from "../styles";

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
    metamaskConnected,
    connect,
    disconnect
  } = useAppContext();


  const [hovered, hoverProps] = useHover();

  return metamaskConnected ? (
    <ConnectWallet
      type="white"
      onClick={disconnect}
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
