import styles from './SideMenu.module.scss'
import Button, { buttonStyle } from '../Button/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { useContext, Dispatch, SetStateAction } from 'react';
import { IUserAccount } from '../../context/user.context';

const SideMenu = () => {
    const value = useContext(UserContext);
    const user = value!.user;
    const setUser = value!.setUser;

    const handleLogOut = () => {
        setUser(null);
    }
    
    return (
    <>
        <div className={styles.skim}></div>
        <div className={styles.main}>
        {
            user ?
            <div className={styles.contentWithUser}>
                <h1>Bookler</h1>
                <div className={styles.greeting}>
                    <span>Welcome back</span>
                    <h2>{user.email}</h2>
                </div>
                <div className={styles.buttons}>
                    <Button buttonStyle={buttonStyle.stroke}>Manage Bookings</Button>
                    <Button buttonStyle={buttonStyle.stroke}>Book a Facility</Button>
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
    </>
    )
}

export default SideMenu