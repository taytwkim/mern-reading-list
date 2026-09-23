const mongoose = require('mongoose');

async function connectDB() {
    const uri = process.env.MONGODB_URI;

    if (!uri || uri.trim() === '') {
        throw new Error('Set MONGODB_URI in api/.env before starting the server.');
    }

    try {
        await mongoose.connect(uri, {
            dbName: 'test',
            serverSelectionTimeoutMS: 10000
        });
    } catch (error) {
        throw new Error('Could not connect to MongoDB.');
    }
}

module.exports = connectDB;