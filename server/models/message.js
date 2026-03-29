// ============================================================
// models/message.js - Message Data Model
// ============================================================
// A "Model" defines the structure (shape) of data stored in
// MongoDB. Think of it like a template for every message.
// Each message will have: username, text, and timestamp.
// ============================================================

const mongoose = require('mongoose'); // Import mongoose

// ---- Step 1: Define the Schema ----
// Schema = the blueprint/template for a document in MongoDB
// Each message document will have these 3 fields:

const messageSchema = new mongoose.Schema({

  // Field 1: Username (who sent the message)
  username: {
    type: String,       // Must be text (string)
    required: true,     // Cannot be empty
    trim: true          // Remove extra spaces automatically
  },

  // Field 2: The actual message text
  text: {
    type: String,       // Must be text (string)
    required: true,     // Cannot be empty
    trim: true          // Remove extra spaces automatically
  },

  // Field 3: Timestamp (when was the message sent)
  // Default = automatically set to current date/time
  timestamp: {
    type: Date,         // Date + time
    default: Date.now   // Auto-set to now when message is created
  }

});

// ---- Step 2: Create the Model ----
// Model = a class that gives us methods like .find(), .save()
// 'Message' = name of the model → creates 'messages' collection in DB

const Message = mongoose.model('Message', messageSchema);

// Export the model so routes.js can use it
module.exports = Message;