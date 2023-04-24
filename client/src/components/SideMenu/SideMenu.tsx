import styles from './SideMenu.module.scss'
import Button, { buttonStyle } from '../Button/Button';

const SideMenu = () => {
    let hasUser = false;

    return (
    <>
        <div className={styles.skim}></div>
        <div className={styles.main}>
            <div className={styles.content}>
                <span>Login to manage bookings</span>
                <Button style={buttonStyle.fill}>Log In</Button>
                <Button style={buttonStyle.stroke}>Sign Up</Button>
            </div>
        </div>  
    </>
    )
}

export default SideMenu