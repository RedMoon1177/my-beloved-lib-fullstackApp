import React, { useState }  from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ serverMessage, setServerMessage ] = useState('');

    // Use the useNavigate hook to get the navigate function
    const navigate = useNavigate();

    // Define the function to be executed on form submission
    const onSubmit = (data) => {
        console.log(data);

        authService.register(data, (registerSuccessful, error) => {
            if(registerSuccessful){
                console.log('SUCCESS')
                navigate('/') // Main.jsx
            } else {
                console.log('NO SUCCESS')
                setServerMessage(error)
            }
        });
    };

    // VALIDATION - start
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

    const fNameValidationRules = {
        required: 'First name is required',
    }

    const lNameValidationRules = {
        required: 'Last name is required',
    }

    // VALIDATION - end

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal text-center">User Registration</h1>
            <label htmlFor="inputFirstName">First Name:</label>
            <input {...register('firstName', fNameValidationRules)} id="inputFirstName" className="form-control" placeholder="Enter your first name" autoFocus />
            {errors.firstName && <p className='ml-2 mt-1 small text-danger'>{errors.firstName.message}</p>}
            <label htmlFor="inputLastName">Last Name:</label>
            <input {...register('lastName', lNameValidationRules)} id="inputLastName" className="form-control" placeholder="Enter your last name" />
            {errors.lastName && <p className='ml-2 mt-1 small text-danger'>{errors.lastName.message}</p>}
            <label htmlFor="inputEmail">Email:</label>
            <input {...register('email', emailValidationRules)} type="email" id="inputEmail" className="form-control" placeholder="Enter your email address" />
            {errors.email && <p className='ml-2 mt-1 small text-danger'>{errors.email.message}</p>}
            <label htmlFor="inputPassword">Password:</label>
            <input {...register('password', passwordValidationRules)} type="password" id="inputPassword" className="form-control" placeholder="Enter your password" />
            {errors.password && <p className='ml-2 mt-1 small text-danger'>{errors.password.message}</p>}
            <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
            { serverMessage && <div className="mt-2 alert alert-danger">{ serverMessage }</div>}
        </form>
    )
}

export default Register;