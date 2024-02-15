import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import '../css/createform.css';

const axiosOptions = {
    validateStatus: function (status) {
        return true;
    },
    withCredentials: true,
};

const EditForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const bookID = location.state?.bookID;
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/books/${bookID}`
                );
                switch (response.status) {
                    case 200: {
                        // Prepopulate the form with data from selectedBook
                        setValue('title', response.data.title);
                        setValue('description', response.data.description);
                        setValue('author', response.data.author);
                        setValue('publisher', response.data.publisher || '');
                        setValue('cover', response.data.cover || '');
                        break;
                    }
                    case 404: {
                        setErrorMessage('Error 404 - Book Not Found!');
                        break;
                    }
                    default: {
                        setErrorMessage(`Error ${response.status} - Something went wrong.`);
                        break;
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrorMessage('An error occurred while fetching the data.');
            }
        };

        fetchData();
    }, [bookID, setValue]);

    const onSubmit = (data) => {
        axios
            .put(
                `${import.meta.env.VITE_API_URL}/books/${bookID}`,
                data,
                axiosOptions
            )
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error);
            });
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="container book-form-container">
            <h2>Update Book Information</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="Title"
                        {...register('title', { required: 'Title is required' })}
                        autoFocus
                    />
                    {errors.title && <p className='ml-2 mt-1 small text-danger'>{errors.title.message}</p>}
                </div>
             
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="Description"
                        {...register('description', { required: 'Description is required' })}
                    />
                    {errors.description && <p className='ml-2 mt-1 small text-danger'>{errors.description.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="author" className="form-label">
                        Author
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        name="Author"
                        {...register('author', { required: 'Author is required' })}
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

                <a className="btn btn-outline-primary" onClick={handleCancel}>
                    Cancel
                </a>{' '}
                &nbsp;&nbsp;
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

            { errorMessage && <div className="mt-2 alert alert-danger">{ errorMessage }</div>}
        </div>
    );
};

export default EditForm;
