import styles from './LoginPage.module.scss'
import Button, { buttonStyle } from '../../components/Button/Button'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className={styles.main}>
        <h1>Bookler</h1>
        <div className={styles.content}>
            
            <div className={styles.formFields}>
                <h2>Log In</h2>
                <input type="text" placeholder='Email' className={styles.formField} />
                <input type="text" placeholder='Password' className={styles.formField} />
            </div>
            <div className={styles.buttons}>
                <Button style={buttonStyle.fill}>Log In</Button>
                <Link to={'/'} >
                    <Button style={buttonStyle.stroke}>Back</Button>
                </Link>
            </div>

        </div>
    </div>
  )
}

export default LoginPage