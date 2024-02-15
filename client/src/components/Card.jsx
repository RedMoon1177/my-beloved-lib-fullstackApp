import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Card = props => {

    const navigate = useNavigate();

    const handleViewClick = () => {
        // Navigate to the ViewForm component with the book ID as state
        navigate(`/books/view/${props.book._id}`, { state: { bookID: props.book._id } });
    };

    const handleEditClick = () => {
        // Navigate to the ViewForm component with the book ID as state
        navigate(`/books/edit/${props.book._id}`, { state: { bookID: props.book._id } });
    };

    const handleDelClick = () => {
        // Navigate to the ViewForm component with the book ID as state
        navigate(`/books/delete/${props.book._id}`, { state: { bookID: props.book._id } });
    };

    return (
        <div className="col-md-4">
            <div className="card mb-4 box-shadow">
                <img
                    className="card-img-top"
                    data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                    alt="Thumbnail [100%x225]"
                    style={{ height: 225, width: '100%', display: 'block' }}
                    src={props.book.cover}
                    data-holder-rendered="true" />
                <div className="card-body">
                    <p className="card-text">{props.book.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <a className="btn btn-sm btn-outline-secondary" onClick={handleViewClick}>View</a>
                            <a className="btn btn-sm btn-outline-secondary" onClick={handleEditClick}>Edit</a>
                            <a className="btn btn-sm btn-outline-secondary" onClick={handleDelClick}>Delete</a>
                        </div>
                        <small className="text-muted">Author: {props.book.author}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;