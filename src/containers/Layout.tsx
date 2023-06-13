import { Bg } from '../styles';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return <Bg>
    <Navbar />
    <div >
      <Outlet />
    </div>
  </Bg>
}

export default Layout;