import Profile from "../components/Profile";
import { NavBarContainer, Link, Text } from "../styles";
import { useAppContext } from "../hooks/useAppContext";
import { deployContracts, getBalance, } from "../services/utils";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavBarContainer>
      <div
        style={{
          display: "flex",
        }}
      >
        <Link onClick={() => navigate('/')}>
          <Text> Home </Text>
        </Link>
        <Link onClick={deployContracts}>
          <Text> DEPOLY</Text>
        </Link>
        {/* <Link onClick={getBalance}>
          <Text> BALANCE</Text>
        </Link> */}
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
