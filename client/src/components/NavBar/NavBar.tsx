import styles from './NavBar.module.scss'
import { useContext } from 'react';
import { MenuContext } from '../../context/menu.context';

const NavBar = () => {
  const { menu, setMenu } = useContext(MenuContext);

  const handleClick = () => {
    console.log('clicked');
    setMenu(!menu);
  }

  return (
    <>
    <div className={styles.main}>
        <h1>Bookler</h1>
        <div className={styles.icon} onClick={handleClick}>
          <p>Hamburger</p>
        </div>
    </div>
    <div className={styles.line}></div>
    </>
  )
}

export default NavBar