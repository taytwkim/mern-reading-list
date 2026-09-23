const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true        
    },
    status: {
        type: String,
        required: true,
        trim: true
    }
});

// The Book model provides database methods such as Book.find() and Book.create().
// Mongoose uses the "books" collection and adds an _id to each document.
module.exports = mongoose.model('Book', bookSchema);