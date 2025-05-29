console.log("Starting app...");

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

let books = [];
let nextId = 1;

app.get('/', (req, res) => {
  console.log("GET / called");
  res.render('index', { books });
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  console.log("POST /books:", title, author);
  if (title && author) {
    books.push({ id: nextId++, title, author });
  }
  res.redirect('/');
});

app.post('/books/delete/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  console.log("DELETE ID:", bookId);
  books = books.filter(b => b.id !== bookId);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
