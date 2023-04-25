import styles from './SideMenu.module.scss'
import Button, { buttonStyle } from '../Button/Button';
import { Link } from 'react-router-dom';

const SideMenu = () => {
    let hasUser = false;

    return (
    <>
        <div className={styles.skim}></div>
        <div className={styles.main}>
            <div className={styles.content}>
                <span>Login to manage bookings</span>
                <Link to={'/login'}>
                    <Button buttonStyle={buttonStyle.fill}>Log In</Button>
                </Link>
                <Link to={'/signup'}>
                    <Button buttonStyle={buttonStyle.stroke}>Sign Up</Button>
                </Link>
            </div>
        </div>  
    </>
    )
}

export default SideMenu