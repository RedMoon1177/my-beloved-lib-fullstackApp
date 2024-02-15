import React, { useState } from 'react';
import '../css/createform.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

const axiosOptions = {
    validateStatus: function (status) {
        return true
    }, 
    withCredentials: true
}

const CreateForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ serverMessage, setServerMessage ] = useState('');

    const navigate = useNavigate();

    const onSubmit = (data) => {
        // Handle the form data submission
        // console.log(data);

        // use axios to post the collected data to the API endpoint
        axios.post(`${import.meta.env.VITE_API_URL}/books`, data, axiosOptions)
            .then(response => {
                // console.log(response)
                // Use the navigate function to redirect to the desired route
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setServerMessage(error)
            })
    };

    const handleCancel = () => {
        // Navigate to the Main.jsx
        navigate('/');
    };

    // VALIDATION - start
   
    const titleValidationRules = {
        required: 'Title is required',
    }

    const descriptValidationRules = {
        required: 'Description is required',
    }

    const authorValidationRules = {
        required: 'Author is required',
    }

    // VALIDATION - end

    return (
        <div className="container book-form-container">
            <h2>Add A New Book</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input type="text" className="form-control" id="title" name="Title"
                        {...register('title', titleValidationRules)} autoFocus
                    />
                    {errors.title && <p className='ml-2 mt-1 small text-danger'>{errors.title.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea className="form-control" id="description" name="Description"
                        {...register('description', descriptValidationRules)}
                    />
                    {errors.description && <p className='ml-2 mt-1 small text-danger'>{errors.description.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="author" className="form-label">
                        Author
                    </label>
                    <input type="text" className="form-control" id="author" name="Author"
                        {...register('author', authorValidationRules)}
                    />
                    {errors.author && <p className='ml-2 mt-1 small text-danger'>{errors.author.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="publisher" className="form-label">
                        Publisher
                    </label>
                    <input type="text" className="form-control" id="publisher" name="Publisher"
                        {...register('publisher')}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="cover" className="form-label">
                        Cover Image (URL)
                    </label>
                    <input type='url' className="form-control" id="cover" name="Cover"
                        {...register('cover')}
                    />
                </div>

                <a className="btn btn-outline-primary" onClick={handleCancel}>Cancel</a> &nbsp;&nbsp;
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>

                { serverMessage && <div className="mt-2 alert alert-danger">{ serverMessage }</div>}
            </form>
        </div>
    );
};

export default CreateForm;
