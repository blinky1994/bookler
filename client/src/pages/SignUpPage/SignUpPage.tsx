import styles from './SignUpPage.module.scss'
import Button, { buttonStyle } from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TextInput from '../../components/TextInput/TextInput'
import { validateSignUp } from '../../utils/validateForm'
import axios from 'axios';

export interface ISignUpForm {
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
    confirmPassword: string;
    confirmPasswordError: string;
}

const SignUpPage = () => {
    const [formDetails, setFormDetails] = useState<ISignUpForm>({
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        confirmPassword: '',
        confirmPasswordError: ''
    });

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
                
            }).catch(err => {
                console.log('Error signing up: ', err.response.data.error);
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