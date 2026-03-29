// ============================================================
// routes.js - API Routes (Endpoints)
// ============================================================
// This file defines our REST API endpoints:
//   GET  /messages → Fetch all messages from MongoDB
//   POST /messages → Save a new message to MongoDB
//
// Think of routes like a menu at a restaurant:
//   - GET  = "Give me the messages" (reading data)
//   - POST = "Here is a new message, save it" (writing data)
// ============================================================

const express = require('express');

// express.Router() creates a mini-app for handling routes
const router = express.Router();

// Import our Message model (the blueprint for messages)
const Message = require('./models/message');


// ============================================================
// ROUTE 1: GET /messages
// ============================================================
// Purpose: Fetch all messages from MongoDB
// Method:  GET (browser/AngularJS is asking for data)
// URL:     http://localhost:3000/messages
// ============================================================

router.get('/messages', async (req, res) => {
  try {
    // Find ALL messages in the 'messages' collection
    // .sort({ timestamp: 1 }) → sort oldest first (1 = ascending)
    // Use -1 for newest first
    const messages = await Message.find().sort({ timestamp: 1 });

    // Send the messages as JSON response
    // Status 200 = Success (OK)
    res.status(200).json(messages);

  } catch (error) {
    // If something goes wrong, send error response
    // Status 500 = Internal Server Error
    console.error('❌ Error fetching messages:', error.message);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});


// ============================================================
// ROUTE 2: POST /messages
// ============================================================
// Purpose: Save a new message to MongoDB
// Method:  POST (AngularJS is sending data to save)
// URL:     http://localhost:3000/messages
// Body:    { username: "Ali", text: "Hello!" }
// ============================================================

router.post('/messages', async (req, res) => {
  try {
    // Extract username and text from the request body
    // req.body contains the JSON data sent by AngularJS
    const { username, text } = req.body;

    // Basic validation: check if username and text exist
    if (!username || !text) {
      // Status 400 = Bad Request (client sent wrong/missing data)
      return res.status(400).json({ error: 'Username and message text are required' });
    }

    // Create a new Message document using our Model
    // This is like filling out the template with actual data
    const newMessage = new Message({
      username: username,
      text: text
      // timestamp is auto-set by default: Date.now
    });

    // Save the message to MongoDB database
    // .save() actually writes the data to the DB
    const savedMessage = await newMessage.save();

    // Send back the saved message as confirmation
    // Status 201 = Created (something new was created)
    res.status(201).json(savedMessage);

    console.log(`💬 New message from "${username}": ${text}`);

  } catch (error) {
    console.error('❌ Error saving message:', error.message);
    res.status(500).json({ error: 'Failed to save message' });
  }
});


// Export router so server.js can use it
module.exports = router;
