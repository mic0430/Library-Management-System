const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json());

// Create MySQL Connection
const db = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database:"",
});

// Connect Database
db.connect((err) => {
  if (err) {
     console.log('MySQL not connected');
    throw err;
  }
  console.log('MySQL connected');
});

app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/books', (req, res) => {
  const sql = "INSERT INTO books (`isbn`, `title`, `author`, `genre`) VALUES (?)";

  const values = [
    req.body.isbn,
    req.body.title,
    req.body.author,
    req.body.genre,
  ];

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting book into database');
    } else {
      console.log('Book added to database:', result);
      res.status(200).send('Book added to database');
    }
  });
});

app.delete('/books', (req, res) => {
  const sql = "DELETE FROM Books WHERE ISBN = ?"

  db.query(sql, [req.body.isbn], (err, result) => {
    if (err) {
      console.error(err);
      
    } else {
      console.log('Book removed from database:', result);
    }
  });
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
