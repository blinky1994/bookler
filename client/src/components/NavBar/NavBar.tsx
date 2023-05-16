import styles from './NavBar.module.scss'
import { useContext, useEffect, useState } from 'react';
import { MenuContext } from '../../context/menu.context';
import { ReactComponent as IconHambuger } from '../Icons/Icon_Hamburger.svg';
import SideMenu from '../SideMenu/SideMenu';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { menu, setMenu } = useContext(MenuContext);
  const [dateTime, setDateTime] = useState('');

  const navigate = useNavigate();

  const handleClick = () => {
    setMenu(!menu);
  }

  const handleClickToHome = () => {
    navigate('/');
  }

  const formatDateTime = () => {

  }

  useEffect(() => {
    const formattedDateTime = new Date(Date.now()).toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric',
    });
    setDateTime(formattedDateTime);
  }, [])

  return (
    <>
    <SideMenu />
    <div className={styles.main}>
    <div className={styles.icon} onClick={handleClick}>
        <IconHambuger />
        </div>
        <h1 onClick={handleClickToHome}>Bookler</h1>
        {
          dateTime && 
          <span>{dateTime}</span>
        }
        
    </div>
    <div className={styles.line}></div>
    </>
  )
}

export default NavBar