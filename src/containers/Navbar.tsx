import Profile from "../components/Profile";
import { NavBarContainer, Link, Text } from "../styles";
import { useAppContext } from "../hooks/useAppContext";
import { mintNft, deployContracts, getBalance, getSurveys, claimNft, approveNft, tokenInfo } from "../services/utils";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const ctx = useAppContext();
  const navigate = useNavigate();

  return (
    <NavBarContainer>
      <div
        style={{
          display: "flex",
        }}
      >
        <Link onClick={() => navigate('/')}>
          <Text> 1Hbar = {ctx?.exRate}$ </Text>
        </Link>
        <Link onClick={deployContracts}>
          <Text> DEPOLY</Text>
        </Link>
        <Link onClick={getBalance}>
          <Text> GetBalance</Text>
        </Link>
        <Link onClick={mintNft}>
          <Text> MINT</Text>
        </Link>
        <Link onClick={tokenInfo}>
          <Text> INFO</Text>
        </Link>
        <Link onClick={approveNft}>
          <Text> APPROVE</Text>
        </Link>
        <Link onClick={claimNft}>
          <Text> CLAIM</Text>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexGrow: 1,
        }}
      >
        <Profile />
      </div>
    </NavBarContainer>
  );
};

export default Navbar;
