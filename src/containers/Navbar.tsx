import Profile from "../components/Profile";
import { NavBarContainer, Link, Text } from "../styles";
import { useAppContext } from "../hooks/useAppContext";
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
        <Profile />
      </div>
    </NavBarContainer>
  );
};

export default Navbar;
