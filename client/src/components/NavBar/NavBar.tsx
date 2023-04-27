import styles from './NavBar.module.scss'
import { useContext } from 'react';
import { MenuContext } from '../../context/menu.context';
import { ReactComponent as IconHambuger } from '../Icons/Icon_Hamburger.svg';

const NavBar = () => {
  const { menu, setMenu } = useContext(MenuContext);

  const handleClick = () => {
    setMenu(!menu);
  }

  return (
    <>
    <div className={styles.main}>
        <h1>Bookler</h1>
        <div className={styles.icon} onClick={handleClick}>
          <IconHambuger />
        </div>
    </div>
    <div className={styles.line}></div>
    </>
  )
}

export default NavBar