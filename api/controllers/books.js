let uid = 0;
let books = [];

function getBooks(req, res) {
    res.status(200).json(books);
}

function createBook(req, res) {
    uid += 1;

    let book = {
        id: uid,
        title: req.body.title,
        author: req.body.author,
        status: req.body.status
    };

    books.push(book);
    res.status(201).json(book);
}

function updateBook(req, res) {
    const id = Number(req.params.id);
    const book = books.find((book) => book.id === id);
    
    if (!book) {
        return res.status(404).json({message: 'Book not found'});
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.status = req.body.status;

    res.status(200).json(book);
}

function deleteBook(req, res) {
    const id = Number(req.params.id);
    books = books.filter((book) => book.id !== id);
    res.status(204).end();
}

module.exports = { getBooks, createBook, updateBook, deleteBook };