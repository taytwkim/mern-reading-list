const express = require('express');
const booksRouter = require('./routes/books');

const PORT = process.env.PORT || 3000;
const app = express();

// Parse JSON request bodies so handlers can read req.body.
app.use(express.json());

// Forward requests beginning with /api/tasks to the task router.
app.use('/api/books', booksRouter);

async function startServer() {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();