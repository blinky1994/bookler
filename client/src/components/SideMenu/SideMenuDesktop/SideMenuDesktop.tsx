import styles from './SideMenuDesktop.module.scss'
import { UserContext } from '../../../context/user.context';
import { useContext, useEffect, useState } from 'react'
import Button, { buttonStyle } from '../../Button/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SideMenuDesktop = () => {
    const [locationPath, setLocationPath] = useState('');
    const value = useContext(UserContext);
    const user = value!.user;
    const setUser = value!.setUser;
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setLocationPath(location.pathname);
    }, [])

    const handleLogOut = () => {
        navigate('/');
        setUser(null);
        localStorage.clear();
    }


    const handleViewAllFacilitiesButton = () => {
        navigate('/');
    }

    const handleMyBookingsButton = () => {
        navigate('/bookings');
    }

    const handleClickToHome = () => {
        navigate('/');
    }

  return (
    <>
    {
        (location.pathname !== "/login" && location.pathname !== "/signup") && 
        <div className={styles.main}>
    {
        user ?
        <div className={styles.contentWithUser}>
            <h1 onClick={handleClickToHome}>Bookler</h1>
            <div className={styles.buttons}>
                <Button onClick={handleViewAllFacilitiesButton} buttonStyle={buttonStyle.stroke}>View All Facilities</Button>
                <Button onClick={handleMyBookingsButton} buttonStyle={buttonStyle.stroke}>My Bookings</Button>
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
            <h1>Bookler</h1>
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
    }
    </>
    
  )
}

export default SideMenuDesktop