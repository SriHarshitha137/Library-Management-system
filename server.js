const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'harshithasql',
    database: 'library_db'
});

db.connect(err => {
    if (err) {
        console.log("DB connection failed:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

// 📌 Get all books
app.get('/books', (req, res) => {
    db.query("SELECT * FROM books", (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});

// 📌 Add a book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    db.query(
        "INSERT INTO books (title, author) VALUES (?, ?)",
        [title, author],
        (err, result) => {
            if (err) return res.send(err);
            res.send("Book added");
        }
    );
});

// 📌 Issue book
app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        "UPDATE books SET available = false WHERE id = ?",
        [id],
        (err, result) => {
            if (err) return res.send(err);
            res.send("Book issued");
        }
    );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


