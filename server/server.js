// ============================================================
// server.js - Main Server File (Entry Point)
// ============================================================
// This is the HEART of our backend application.
// It does 3 main things:
//   1. Creates an Express web server
//   2. Connects to MongoDB
//   3. Listens for incoming requests (from AngularJS frontend)
// ============================================================

// ---- Import Required Libraries ----

// Express: Framework for building web servers in Node.js
const express = require('express');

// CORS: Allows our frontend (different port) to talk to backend
// Without CORS, browser blocks requests between different ports
const cors = require('cors');

// Path: Node.js built-in module for working with file paths
const path = require('path');

// Our custom files
const connectDB = require('./db');           // MongoDB connection
const messageRoutes = require('./routes');   // API routes


// ---- Create Express App ----
const app = express();

// ---- Define Port ----
// Server will run on port 3000
// Process.env.PORT allows changing port via environment variable
const PORT = process.env.PORT || 3000;


// ============================================================
// MIDDLEWARE SETUP
// ============================================================
// Middleware = functions that run BEFORE our route handlers
// They process every request that comes in
// ============================================================

// 1. CORS Middleware
// Allows requests from any origin (our frontend on different port)
app.use(cors());

// 2. JSON Body Parser Middleware
// Reads JSON data sent in request body (from AngularJS)
// Without this, req.body would be undefined
app.use(express.json());

// 3. URL-Encoded Body Parser
// Handles form data (just in case)
app.use(express.urlencoded({ extended: true }));

// 4. Static Files Middleware
// Serves our frontend files (HTML, CSS, JS) from 'client' folder
// When you visit http://localhost:3000, it serves index.html
app.use(express.static(path.join(__dirname, '../client')));


// ============================================================
// ROUTES SETUP
// ============================================================
// Attach our API routes to the app
// All routes in routes.js will be prefixed with nothing here
// So GET /messages works as http://localhost:3000/messages
// ============================================================

app.use('/', messageRoutes);


// ============================================================
// START THE SERVER
// ============================================================
// First connect to MongoDB, THEN start listening for requests
// This ensures DB is ready before we accept any requests
// ============================================================

const startServer = async () => {
  // Step 1: Connect to MongoDB
  await connectDB();

  // Step 2: Start listening on the port
  app.listen(PORT, () => {
    console.log('');
    console.log('🚀 ==========================================');
    console.log(`🌐 Server running at: http://localhost:${PORT}`);
    console.log(`📡 API Endpoints:`);
    console.log(`   GET  http://localhost:${PORT}/messages`);
    console.log(`   POST http://localhost:${PORT}/messages`);
    console.log('🚀 ==========================================');
    console.log('');
  });
};

// Call the function to start everything
startServer();
