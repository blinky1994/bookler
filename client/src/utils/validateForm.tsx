import { Dispatch, SetStateAction } from "react";
import { ILoginForm } from "../pages/Login/LoginPage";
import { ISignUpForm } from "../pages/SignUpPage/SignUpPage";

export const validateLogin = (formDetails: ILoginForm , setFormDetails: Dispatch<SetStateAction<ILoginForm>>) => {
    const { email, password } = formDetails;
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setFormDetails({
        ...formDetails,
        emailError,
        passwordError
    });

    return !emailError && !passwordError;
}

export const validateSignUp = (formDetails: ISignUpForm , setFormDetails: Dispatch<SetStateAction<ISignUpForm>>) => {
    const { email, password, confirmPassword } = formDetails;
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

    setFormDetails({
        ...formDetails,
        emailError,
        passwordError,
        confirmPasswordError
    })

    return !emailError && !passwordError && !confirmPasswordError;
}

const validateEmail = (email: string) => {
    if (email === '') return 'Email cannot be empty';

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValidEmail = emailRegex.test(email); 

    if (!isValidEmail) {
        return 'Email is not valid'
    }

    return '';
}

const validatePassword = (password: string) => {
    if (password === '') return 'Password cannot be empty';
    if (password.length < 12) return 'Password must be at least 12 characters or more'
    return '';
}

const validateConfirmPassword = (confirmPassword: string, password: string) => {
    if (confirmPassword === '') return 'Please confirm your password';
    if (confirmPassword !== password) return 'Password does not match';
    return '';
}