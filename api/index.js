const express = require('express');
const booksRouter = require('./routes/books');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;
const app = express();

// Parse JSON request bodies so handlers can read req.body.
app.use(express.json());

// Forward requests beginning with /api/books to the book router.
app.use('/api/books', booksRouter);

async function startServer() {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();
