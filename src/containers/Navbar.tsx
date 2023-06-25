import Profile from "../components/Profile";
import { NavBarContainer, Link, Text } from "../styles";
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
          <img src="/images/logo.svg" alt="logo" /><Text> HashChange </Text>
        </Link>
        <Link onClick={() => navigate('/my-surveys')}>
          <Text> My Surveys </Text>
        </Link>
        <Link onClick={() => navigate('/my-answers')}>
          <Text> My Answers </Text>
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
