import styles from './LoginPage.module.scss'
import Button, { buttonStyle } from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import TextInput from '../../components/TextInput/TextInput'
import { validateLogin } from '../../utils/validateForm'
import axios from 'axios'
import { IUserAccount, UserContext } from '../../context/user.context'
import { useNavigate } from 'react-router-dom'
import { MenuContext } from '../../context/menu.context'

export interface ILoginForm {
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
}

const LoginPage = () => {
    const value = useContext(UserContext);
    const setUser = value!.setUser;

    const navigate = useNavigate();

    const { setMenu } = useContext(MenuContext);
 
    const [formDetails, setFormDetails] = useState<ILoginForm>({
        email: 'ivanchenyifan@hotmail.com',
        emailError: '',
        password: '111111111111',
        passwordError: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    // For Debugging
    // useEffect(() => {
    //     console.log(`email:${formDetails.email} pass:${formDetails.password}`);
    // }, [formDetails])


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormDetails({
            ...formDetails,
            [name] : value,
        });
    }

    const saveUserToStorage = (user: IUserAccount) => {
        localStorage.setItem('user', JSON.stringify(user));
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        setErrorMessage('');
        if (validateLogin(formDetails, setFormDetails)) {
            const { email, password } = formDetails;
            axios.post('http://localhost:3001/login', {
                email, password
            })
            .then(response => {
                setFormDetails({
                    email: '',
                    emailError: '',
                    password: '',
                    passwordError: ''
                })
                console.log(`Successfully logged in: ${JSON.stringify(response.data.user)}`);
                const {id, email} = response.data.user;

                const user = {
                    id,
                    email
                };
                setUser(user);
                saveUserToStorage(user)
                
                navigate(-1);
                
            }).catch(err => {
                console.log('Error logging in: ', err.response.data.error);
                console.log(err);
                setErrorMessage(err.response.data.error.slice(6));
            })      
        };
    }

    return (
    <div className={styles.main}>
        <h1>Bookler</h1>
        <div className={styles.content}>
            
            <div className={styles.formFields}>
                <h2>Log In</h2>
                <TextInput name='email' value={formDetails.email} onChange={handleChange} type="text" placeholder='Email' error={formDetails.emailError}/>
                <TextInput name='password' value={formDetails.password} onChange={handleChange} type="password" placeholder='Password' error={formDetails.passwordError}/>
            </div>
            {
                errorMessage && <span className={styles.errorMessage} >{errorMessage}</span>
            }
            <div className={styles.buttons}>
                <Button onClick={handleSubmit} buttonStyle={buttonStyle.fill}>Log In</Button>
                <Link to={'/'} >
                    <Button buttonStyle={buttonStyle.stroke}>Back</Button>
                </Link>
            </div>

        </div>
    </div>
    )
}

export default LoginPage