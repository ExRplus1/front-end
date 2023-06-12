/* eslint-disable react/jsx-no-undef */
import './App.css';
import { Routes, Route } from "react-router-dom";
import { Landing } from './pages/Landing';
import { BrowserRouter } from "react-router-dom";

import { Outlet } from 'react-router-dom';
import { NavBarContainer, Link, Text, ConnectWallet, Bg } from './styles';


const Navbar = () => {
  return (
    <NavBarContainer>
      <div style={{
        display: "flex"
      }}>
        <Link><Text> Link 1</Text></Link>
        <Link><Text> Link 2</Text></Link>
        <Link><Text> Link 3</Text></Link>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        flexGrow: 1,
      }} >
        <ConnectWallet><Text>Connect Wallet</Text></ConnectWallet>
      </div>
    </NavBarContainer>
  );
};


const Layout = () => {
  return <Bg>
    <Navbar />
    <div >
      <Outlet />
    </div>
  </Bg>
}

function App() {
  return <div className="app">

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
        </Route>
      </Routes>

    </BrowserRouter>
  </div>
}

export default App;
