import Profile from "../components/Profile";
import { NavBarContainer, Link, Text } from "../styles";
import { useAppContext } from "../hooks/useAppContext";
import { createNft, deployContracts, getAnswer, getAnswers, getBadgesOfAddress, getBalance, getSurveys, getUserAnswers } from "../services/utils";
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
          <Text> DEV :: Deploy Contracts</Text>
        </Link>
        <Link onClick={getSurveys}>
          <Text> GetSurveys</Text>
        </Link>
        <Link onClick={getBalance}>
          <Text> GetBalance</Text>
        </Link>
        <Link onClick={createNft}>
          <Text> Answers</Text>
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
