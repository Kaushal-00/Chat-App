// ============================================================
// db.js - MongoDB Database Connection File
// ============================================================
// This file is responsible for connecting our Node.js app
// to MongoDB using Mongoose (a library that makes MongoDB easy)
// ============================================================

const mongoose = require('mongoose'); // Import mongoose library

// MongoDB connection URL
// Format: mongodb://localhost:27017/YOUR_DATABASE_NAME
// - localhost:27017 → MongoDB runs on your computer, port 27017
// - chatapp         → This is the name of our database
// const MONGO_URI = 'mongodb://localhost:27017/chatapp';

// IMPORTANT: Use 127.0.0.1 instead of localhost to avoid connection error
const MONGO_URI = 'mongodb://127.0.0.1:27017/chatapp';

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Try to connect to MongoDB
    await mongoose.connect(MONGO_URI);

    // If connected successfully, show this message
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📦 Database: chatapp');

  } catch (error) {
    // If connection fails, show the error
    console.error('❌ MongoDB Connection Failed:', error.message);

    // Exit the process with failure code (1)
    // This stops the server if DB connection fails
    process.exit(1);
  }
};

// Export the function so server.js can use it
module.exports = connectDB;
