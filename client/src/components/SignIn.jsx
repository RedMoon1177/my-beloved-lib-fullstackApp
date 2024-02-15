import React, { useState } from 'react';
import '../css/signin.css';
import { useForm } from 'react-hook-form';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ serverMessage, setServerMessage ] = useState('');

    const sendCredentials = loginData => {
        console.log(loginData);

        authService.signin(loginData, (isSignInSuccessful, error) => {
            if(isSignInSuccessful){
                console.log('SUCCESS')
                navigate('/') // Main.jsx
            } else {
                console.log('NO SUCCESS')
                setServerMessage(error)
            }
        });
    }

    const emailValidationRules = {
        required: 'Email is required',
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Must be valid email format",
        }
    }

    const passwordValidationRules = {
        required: 'Password is required',
    }

    return (
        <form onSubmit={handleSubmit(sendCredentials)} className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input {...register('email', emailValidationRules)} id="inputEmail" className="form-control" placeholder="Email address" autoFocus />
            {errors.email && <p className='ml-2 mt-1 small text-danger'>{errors.email.message}</p>}
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input {...register('password', passwordValidationRules)} type="password" id="inputPassword" className="form-control" placeholder="Password" />
            {errors.password && <p className='ml-2 mt-1 small text-danger'>{errors.password.message}</p>}
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      
            { serverMessage && <div className="mt-2 alert alert-danger">{ serverMessage }</div>}
        </form>
    );
}

export default SignIn;