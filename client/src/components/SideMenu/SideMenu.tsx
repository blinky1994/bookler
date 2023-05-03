import styles from './SideMenu.module.scss'
import Button, { buttonStyle } from '../Button/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { useContext } from 'react';
import { MenuContext } from '../../context/menu.context';
import { ReactComponent as IconCancel } from '../Icons/Icon_Cancel.svg';

const SideMenu = () => {
    const value = useContext(UserContext);
    const user = value!.user;
    const setUser = value!.setUser;

    const { menu, setMenu } = useContext(MenuContext); 
    const handleLogOut = () => {
        setUser(null);
    }

    const handleMenu = () => {
        setMenu(!menu);
    }
    
    return (
    <>
        <div onClick={handleMenu} className={menu ? styles.skimOpen : styles.skimClose}></div>
        <div className={menu ? styles.menuOpen : styles.menuClose}>
        <div className={styles.main}>
        <div onClick={handleMenu} className={styles.cancelIcon}>
            <IconCancel />
        </div>
        {
            user ?
            <div className={styles.contentWithUser}>
                <h1>Bookler</h1>
                <div className={styles.buttons}>
                    <Button buttonStyle={buttonStyle.stroke}>Manage Bookings</Button>
                    <Button buttonStyle={buttonStyle.stroke}>Book a Facility</Button>
                </div>
                <div className={styles.greeting}>
                    <span>Logged in as</span>
                    <h2>{user.email}</h2>
                </div>
                <div className={styles.logOutButton}>
                    <Button onClick={handleLogOut} buttonStyle={buttonStyle.fill}>Log Out</Button>
                </div>
            </div>
            :
            <div className={styles.contentWithoutUser}>
                <span>Login to manage bookings</span>
                <Link to={'/login'}>
                    <Button buttonStyle={buttonStyle.fill}>Log In</Button>
                </Link>
                <Link to={'/signup'}>
                    <Button buttonStyle={buttonStyle.stroke}>Sign Up</Button>
                </Link>
            </div>
        }
        </div>  
        </div>
    </>
    )
}

export default SideMenu