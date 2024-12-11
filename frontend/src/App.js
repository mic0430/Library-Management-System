import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from "react";
import "./App.css";
import bookImage1 from "./assets/images/books/harry-potter/01.webp";
import bookImage2 from "./assets/images/books/harry-potter/02.webp";
import bookImage3 from "./assets/images/books/harry-potter/03.webp";
import bookImage4 from "./assets/images/books/harry-potter/04.webp";
import bookImage5 from "./assets/images/books/harry-potter/05.webp";
import bookImage6 from "./assets/images/books/harry-potter/06.webp";
import bookImage7 from "./assets/images/books/harry-potter/07.webp";
import { firebaseConfig } from './init';

function App() {


    let isNewBookScreenVisible = false;
    let isRemoveBookScreenVisible = false;
    function toggleNewBookScreen() {
        isNewBookScreenVisible = !isNewBookScreenVisible;
        updateVisibility();
    }
    function toggleRemoveBookScreen() {
      isRemoveBookScreenVisible = !isRemoveBookScreenVisible;
      showRemoveBookScreen();
  }


  function showRemoveBookScreen() {
      const removeBookScreen = document.querySelector('.remove-book-screen');
      const initialScreen = document.querySelector('.initial-screen');
      if (isRemoveBookScreenVisible) {
          removeBookScreen.classList.remove('hidden');
          initialScreen.classList.add('hidden')
      } else {
          removeBookScreen.classList.add('hidden');
          initialScreen.classList.remove('hidden')
      }
  }
    function updateVisibility() {
        const newBookScreen = document.querySelector('.new-book-screen');
        const initialScreen = document.querySelector('.initial-screen');
        if (isNewBookScreenVisible) {
            newBookScreen.classList.remove('hidden');
            initialScreen.classList.add('hidden')
        } else {
            newBookScreen.classList.add('hidden');
            initialScreen.classList.remove('hidden')
        }
    }

    async function addNewBook() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
        const genre = document.getElementById('genre').value;

        const newBook = {
          isbn:isbn,
          title: title,
          author: author,
          genre: genre
        };

         try {
      await axios.post("http://localhost:8080/books", newBook);
   
    } catch (err) {
      console.log(err);
     
    }

        isNewBookScreenVisible = false;
    }

    async function removeBook() {
      const isbn = document.getElementById('removeBookISBN').value;
    
      try {
        const response = await axios.delete("http://localhost:8080/books", { data: { isbn } });
    
        if (response.status === 200) {
          console.log('Book removed:', isbn);
        } else {
          console.log('Book not found.');
        }
      } catch (err) {
        console.error('Error removing book:', err);
        alert('Error removing book. Please check the console for details.');
      }
    }

  const bookImages = [bookImage1, bookImage2, bookImage3, bookImage4, bookImage5, bookImage6, bookImage7]

  const [books, setBooks] = useState([]);
  const firstNineBooks = books.slice(0, 9);

  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered successfully!');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('User signed in successfully!');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleNewBook = () => {
    try {
      // showNewBookField();
      console.log('User signed in successfully!');
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetch('http://localhost:8080/books')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setBooks(data);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);
return (
  <div>
         
         
      {/* <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button> */}

  
  <div className="landing-container">
      <div className="landing-header">
              <div className="initial-screen">
                      <h1 className="landing-header-title">Library Management System</h1>
                      <div className="landing-header-buttons">
                            <button
                            className="button contact-button"
                            onClick=""
                            >
                                Search Book
                            </button>
                            <button
                            className="button work-button"
                            onClick={toggleNewBookScreen}
                            >
                            Add Book
                            </button>
                            <button 
                            className="button work-button"
                            onClick={toggleRemoveBookScreen}
                            > 
                            Remove Book
                            </button>
                            
                            
                      </div>
              </div>
              <div className={isNewBookScreenVisible ? 'new-book-screen' : 'new-book-screen hidden'}>
                  <form className="book-form">
                    <h1>New Book</h1>
                      <input
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Enter the book title"
                          required
                      />
                      <input
                          type="text"
                          id="author"
                          name="author"
                          placeholder="Enter the author's name"
                          required
                      />
                      <input
                          type="text"
                          id="isbn"
                          name="isbn"
                          placeholder="Enter the ISBN"
                          required
                      />
                      <input
                          type="text"
                          id="genre"
                          name="genre"
                          placeholder="Enter the genre"
                          required
                      />

                      <button
                          type="button"
                          className="button"
                          onClick={addNewBook}
                      >
                          Add Book
                      </button>
                  </form>
              </div>
              <div className={isRemoveBookScreenVisible ? 'remove-book-screen' : 'remove-book-screen hidden'}>
                  <form className="book-form">
                    <h1>Remove Book</h1>
                      <input
                          type="text"
                          id="removeBookISBN"
                          name="isbn"
                          placeholder="Enter the book's ISBN..."
                          required
                      />
                      <button
                          type="button"
                          className="button"
                          onClick={removeBook}
                      >
                          Remove
                      </button>
                  </form>
              </div>
      </div>
  </div>
    
    <div className="book-list">
      <h1>Featured Books</h1>
      <div className="book-grid">
        {firstNineBooks.map((book, index) => (
          <div className="book-item" key={index}>
            <img width={"200px"} src={bookImages[index]} alt={"hello"}></img>
            <h2>{book.title}</h2>
            <p>{book.author} | {book.genre} | {book.isbn}</p>
            <p style={{ color: book.available ? 'green' : 'red' }}>
                {book.available ? 'Available' : 'Not Available'}
             </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}

export default App;
//npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
 // npm install @fortawesome/free-regular-svg-icons