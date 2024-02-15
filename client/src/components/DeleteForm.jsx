import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import axios from 'axios';


const axiosOptions = {
  validateStatus: function (status) {
    return true
  },
  withCredentials: true
}

const DeleteForm = () => {

  const navigate = useNavigate();
  const isComponentMounted = useRef(true);
  const location = useLocation();
  const bookID = location.state?.bookID;

  useEffect(() => {

    const fetchData = async () => {
      // Show confirmation alert when component mounts
      if (isComponentMounted.current) {
        const confirmation = window.confirm('Are you sure you want to delete this book?');
        isComponentMounted.current = false;

        // Perform deletion based on user's confirmation
        if (confirmation) {
          // Perform delete action
          console.log('Book deleted!');

          // use axios to post the collected data to the API endpoint
          axios.delete(`${import.meta.env.VITE_API_URL}/books/${bookID}`, axiosOptions)
            .catch(error => {
              console.error('Error deleting book:', error);
            })
        } else {
          console.log('Deletion canceled');
        }

        // Navigate to home page regardless of confirmation result
        navigate('/');
      }
    };

    fetchData();

  }, [navigate]);

  return true;
}

export default DeleteForm;
