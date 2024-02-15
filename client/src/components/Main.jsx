import React, { useEffect, useState } from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import Card from './Card';

const Main = () => {

  // define state hook to store the data
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // make an initial call to our api to retrieve all data
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/books`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const handleSearch = () => {
    //perform filtering based on the search input
    const filteredBooks = books.filter(book => {
      return book.title.toLowerCase().includes(searchInput.toLowerCase());
    });

    setBooks(filteredBooks);
  }


  return (
    <div>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search book's title"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleSearch}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">

            {
              books.map((book, index) => {
                return (
                  <Card key={index} book={book} />
                )
              })
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;