import styles from './SignUpPage.module.scss'
import Button, { buttonStyle } from '../../components/Button/Button'
import { useState, useContext } from 'react'
import TextInput from '../../components/TextInput/TextInput'
import { validateSignUp } from '../../utils/validateForm'
import axios from 'axios';
import { UserContext } from '../../context/user.context'
import { useNavigate } from 'react-router-dom'
import { MenuContext } from '../../context/menu.context'
import { IUserAccount } from '../../context/user.context'

export interface ISignUpForm {
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
    confirmPassword: string;
    confirmPasswordError: string;
}

const SignUpPage = () => {
    const value = useContext(UserContext);
    const setUser = value!.setUser;

    const navigate = useNavigate();

    const { setMenu } = useContext(MenuContext);

    const [formDetails, setFormDetails] = useState<ISignUpForm>({
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        confirmPassword: '',
        confirmPasswordError: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    // For Debugging
    // useEffect(() => {
    //     console.log(`email:${formDetails.email} pass:${formDetails.password} confirm:${formDetails.confirmPassword}`);
    // }, [formDetails])

    const saveUserToStorage = (user: IUserAccount) => {
        localStorage.setItem('user', JSON.stringify(user));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormDetails({
            ...formDetails,
            [name] : value,
        })
    }

    const handleBackButton = () => {
        navigate(-1);
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        setErrorMessage('');
        if (validateSignUp(formDetails, setFormDetails)) {
            const { email, password } = formDetails;
            
            axios.post('http://localhost:3001/api/signup', {
                email, password
            })
            .then(response => {
                setFormDetails({
                    email: '',
                    emailError: '',
                    password: '',
                    passwordError: '',
                    confirmPassword: '',
                    confirmPasswordError: ''
                })
                console.log(`Successfully created user: ${JSON.stringify(response.data.user)}`);
                const {id, email} = response.data.user;
                const user = {
                    id, email
                }
                setUser(user);
                saveUserToStorage(user);
                navigate('/');
                // setMenu(false);
            }).catch(err => {
                console.log('Error logging in: ', err.response.data.error);
                setErrorMessage(err.response.data.error.slice(6));
            })
        };
    }

    return (
        <div className={styles.main}>
            <h1>Bookler</h1>
            <div className={styles.content}>
                
                <div className={styles.formFields}>
                    <h2>Sign Up</h2>
                    <TextInput name="email" value={formDetails.email} onChange={handleChange} type="text" placeholder='Email' error={formDetails.emailError}/>
                    <TextInput name="password" value={formDetails.password} onChange={handleChange} type="password" placeholder='Password' error={formDetails.passwordError}/>
                    <TextInput name="confirmPassword" value={formDetails.confirmPassword} onChange={handleChange} type="password" placeholder='Confirm Password' error={formDetails.confirmPasswordError}/>
                </div>
                {
                 errorMessage && <span className={styles.errorMessage} >{errorMessage}</span>
                }
                <div className={styles.buttons}>
                    <Button onClick={handleSubmit} buttonStyle={buttonStyle.fill}>Sign Up</Button>
                    <Button onClick={handleBackButton} buttonStyle={buttonStyle.stroke}>Back</Button>
                </div>
    
            </div>
        </div>
      )
}

export default SignUpPage