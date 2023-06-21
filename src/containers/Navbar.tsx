import Profile from "../components/Profile";
import { NavBarContainer, Link, Text } from "../styles";
import { useAppContext } from "../hooks/useAppContext";
import { deployContracts, getAnswer, getAnswers, getBadgesOfAddress, getSurveys, getUserAnswers } from "../services/utils";

const Navbar = () => {
  const ctx = useAppContext();
  return (
    <NavBarContainer>
      <div
        style={{
          display: "flex",
        }}
      >
        <Link>
          <Text> 1Hbar = {ctx?.exRate}$ </Text>
        </Link>
        <Link onClick={deployContracts}>
          <Text> DEV :: Deploy Contracts</Text>
        </Link>
        <Link onClick={getSurveys}>
          <Text> GetSurveys</Text>
        </Link>
        <Link onClick={getBadgesOfAddress}>
          <Text> GetBadges</Text>
        </Link>
        <Link onClick={getAnswers}>
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
