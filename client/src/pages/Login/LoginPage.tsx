import styles from './LoginPage.module.scss'
import Button, { buttonStyle } from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TextInput from '../../components/TextInput/TextInput'
import { validateLogin } from '../../utils/validateForm'

export interface ILoginForm {
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
}

const LoginPage = () => {
    const [formDetails, setFormDetails] = useState<ILoginForm>({
        email: '',
        emailError: '',
        password: '',
        passwordError: ''
    });

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

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (validateLogin(formDetails, setFormDetails)) {
            setFormDetails({
                email: '',
                emailError: '',
                password: '',
                passwordError: ''
            })
            console.log(`Successful: ${formDetails.email} ${formDetails.password}`);
        };
    }

    return (
    <div className={styles.main}>
        <h1>Bookler</h1>
        <div className={styles.content}>
            
            <div className={styles.formFields}>
                <h2>Log In</h2>
                <TextInput name='email' value={formDetails.email} onChange={handleChange} type="text" placeholder='Email' error={formDetails.emailError}/>
                <TextInput name='password' value={formDetails.password} onChange={handleChange} type="text" placeholder='Password' error={formDetails.passwordError}/>
            </div>
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