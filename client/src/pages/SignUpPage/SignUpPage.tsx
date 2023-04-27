import styles from './SignUpPage.module.scss'
import Button, { buttonStyle } from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import TextInput from '../../components/TextInput/TextInput'
import { validateSignUp } from '../../utils/validateForm'
import axios from 'axios';
import { UserContext } from '../../context/user.context'
import { useNavigate } from 'react-router-dom'

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


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormDetails({
            ...formDetails,
            [name] : value,
        })
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        setErrorMessage('');
        if (validateSignUp(formDetails, setFormDetails)) {
            const { email, password } = formDetails;
            
            axios.post('http://localhost:3001/signup', {
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
                setUser({
                    id,
                    email
                });
                navigate('/');
            }).catch(err => {
                let errorMsg = err.response.data.error;
                if (errorMsg.includes('Duplicate')) {
                    errorMsg = 'Account already exists'
                }
                console.log('Error signing up: ', errorMsg);
                setErrorMessage(errorMsg);
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
                    <TextInput name="password" value={formDetails.password} onChange={handleChange} type="text" placeholder='Password' error={formDetails.passwordError}/>
                    <TextInput name="confirmPassword" value={formDetails.confirmPassword} onChange={handleChange} type="text" placeholder='Confirm Password' error={formDetails.confirmPasswordError}/>
                </div>
                {
                 errorMessage && <span className={styles.errorMessage} >{errorMessage}</span>
                }
                <div className={styles.buttons}>
                    <Button onClick={handleSubmit} buttonStyle={buttonStyle.fill}>Sign Up</Button>
                    <Link to={'/'} >
                        <Button buttonStyle={buttonStyle.stroke}>Back</Button>
                    </Link>
                </div>
    
            </div>
        </div>
      )
}

export default SignUpPage