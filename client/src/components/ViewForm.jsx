import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewForm = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const bookID = location.state?.bookID;
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        // Use an asynchronous function inside useEffect
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/${bookID}`);
                switch (response.status) {
                    case 200: {
                        // successful retrieve
                        setSelectedBook(response.data);
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

        // Call the asynchronous function
        fetchData();
    }, [bookID]); // Add bookID as a dependency to re-run the effect when it changes

    const handleCancel = () => {
        // Navigate to the Main.jsx
        navigate('/');
    };

    return (
        <div className="container book-form-container">
            <h2 className="text-primary fw-bold">{selectedBook?.title}</h2>

            <div className="mb-3">
                <label htmlFor="author" className="form-label">
                    Written by <span style={{ fontWeight: 'bold' }}>{selectedBook?.author}</span>
                </label>
                <br />
                <label htmlFor="publisher" className="form-label">
                    Published by  <span style={{ fontWeight: 'bold' }}>{selectedBook?.publisher}</span>
                </label>
            </div>

            <div className="mb-3 d-flex flex-row" style={{ gap: '20px' }}>
    
                <img src={selectedBook?.cover} alt="book_cover_image" style={{ width: '100%', height: 'auto', maxWidth: '300px' }} />

                <label htmlFor="description" className="form-label">
                    <span>{selectedBook?.description}</span>
                </label>
            </div>

            <a className="btn btn-outline-primary mt-4" onClick={handleCancel}>Back To Home Page</a> &nbsp;&nbsp;

            {errorMessage && <div className="mt-2 alert alert-danger">{errorMessage}</div>}
        </div>
    )
};

export default ViewForm;
