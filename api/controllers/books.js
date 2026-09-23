const mongoose = require('mongoose');
const Book = require('../models/Book');

function toBookResponse(book) {
    return { id: book._id.toString(), title: book.title, author: book.author, status: book.status };
}

async function getBooks(req, res) {
    const books = await Book.find();
    res.status(200).json(books.map(toBookResponse));
}

async function createBook(req, res) {
    const title = req.body?.title;
    const author = req.body?.author;
    const status = req.body?.status;

    if (typeof title !== 'string' || title.trim().length == 0) {
        return res.status(400).json({ message: 'Title must be a non-empty string' });
    }

    if (typeof author !== 'string' || author.trim().length == 0) {
        return res.status(400).json({ message: 'Author must be a non-empty string' });
    }

    if (typeof status !== 'string' || (status != "Not Started" && status != "Reading" && status != "Finished")) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const book = await Book.create({
        title: title,
        author: author,
        status: status
    });

    res.status(201).json(toBookResponse(book));
}

async function updateBook(req, res) {
    const id = req.params.id;

    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).json({ message: 'Invalid id' });
    }

    const title = req.body?.title;
    const author = req.body?.author;
    const status = req.body?.status;

    if (typeof title !== 'string' || title.trim().length == 0) {
        return res.status(400).json({ message: 'Title must be a non-empty string' });
    }

    if (typeof author !== 'string' || author.trim().length == 0) {
        return res.status(400).json({ message: 'Author must be a non-empty string' });
    }

    if (typeof status !== 'string' || (status != "Not Started" && status != "Reading" && status != "Finished")) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const book = await Book.findByIdAndUpdate(
        id,
        {
            title: title,
            author: author,
            status: status
        },
        { returnDocument: 'after', runValidators: true }
    );
    
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(toBookResponse(book));
}

async function deleteBook(req, res) {
    const id = req.params.id;
    
    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).json({ message: 'Invalid id' });
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.status(204).end();
}

module.exports = { getBooks, createBook, updateBook, deleteBook };
