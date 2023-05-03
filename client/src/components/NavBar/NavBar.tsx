import styles from './NavBar.module.scss'
import { useContext } from 'react';
import { MenuContext } from '../../context/menu.context';
import { ReactComponent as IconHambuger } from '../Icons/Icon_Hamburger.svg';
import SideMenu from '../SideMenu/SideMenu';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { menu, setMenu } = useContext(MenuContext);

  const navigate = useNavigate();

  const handleClick = () => {
    setMenu(!menu);
  }

  const handleClickToHome = () => {
    navigate('/');
  }

  return (
    <>
    <SideMenu />
    <div className={styles.main}>
        <h1 onClick={handleClickToHome}>Bookler</h1>
        <div className={styles.icon} onClick={handleClick}>
          <IconHambuger />
        </div>
    </div>
    <div className={styles.line}></div>
    </>
  )
}

export default NavBar