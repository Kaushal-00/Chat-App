# Chat-App - Beginner Chat Application

A simple, beginner-friendly chat application built with:
- **Frontend**: HTML, CSS, JavaScript, AngularJS (v1.8.3)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose

---

## 📁 Project Structure

```
chat-app/
│
├── server/                    ← Backend (Node.js) files
│   ├── server.js              ← Main server entry point
│   ├── db.js                  ← MongoDB connection
│   ├── routes.js              ← API endpoints (GET/POST)
│   └── models/
│       └── message.js         ← MongoDB data model/schema
│
├── client/                    ← Frontend (AngularJS) files
│   ├── index.html             ← Main HTML page
│   ├── app.js                 ← AngularJS module + filters
│   ├── controller.js          ← AngularJS controller ($scope)
│   ├── service.js             ← AngularJS service ($http)
│   ├── directive.js           ← AngularJS custom directives
│   └── style.css              ← All CSS styles
│
├── package.json               ← Node.js project config + dependencies
└── README.md                  ← This file!
```

---

## 📚 What Each File Does

| File | Purpose |
|------|---------|
| `server/server.js` | Creates Express server, sets up middleware, starts listening |
| `server/db.js` | Connects Node.js to MongoDB using Mongoose |
| `server/routes.js` | Defines GET /messages and POST /messages API endpoints |
| `server/models/message.js` | Defines the Message schema (username, text, timestamp) |
| `client/index.html` | The HTML page with all AngularJS directives |
| `client/app.js` | Creates `chatApp` module + custom filters (timeAgo, capitalize) |
| `client/controller.js` | ChatController with $scope, $interval, API calls |
| `client/service.js` | ChatService that handles HTTP requests using $http |
| `client/directive.js` | Custom directives: autoFocus, chatMessage, enterKey |
| `client/style.css` | All CSS: layout, chat bubbles, responsive design |

---

## ✅ Syllabus Concepts Covered

### CSS + JavaScript
- ✅ Basic CSS styling (dark theme chat UI)
- ✅ Responsive design (@media queries for mobile)
- ✅ DOM manipulation (scrollTop for auto-scroll)
- ✅ Event handling (keydown in directives)
- ✅ AJAX via AngularJS $http service

### AngularJS Basics
- ✅ Module (`angular.module('chatApp', [])`)
- ✅ Controller (`ChatController` with `$scope`)
- ✅ Data binding (`ng-model`, `{{ }}`)
- ✅ `ng-repeat` (loops through messages)
- ✅ `ng-click` (send button, join button)
- ✅ Form handling (username + message forms)

### AngularJS Advanced
- ✅ Custom Filter: `timeAgo` (converts timestamp to "2 min ago")
- ✅ Custom Filter: `capitalize` (capitalizes first letter)
- ✅ Service: `ChatService` (wraps $http GET/POST calls)
- ✅ Custom Directive: `autoFocus` (auto-focuses input)
- ✅ Custom Directive: `chatMessage` (message bubble component)
- ✅ Custom Directive: `enterKey` (sends on Enter key press)

### Forms & Validation
- ✅ Username required validation (empty check)
- ✅ Message empty validation
- ✅ Error messages displayed in UI
- ✅ Button disabled when input is empty

### Node.js + Express
- ✅ Express server setup
- ✅ REST API: GET /messages
- ✅ REST API: POST /messages
- ✅ Express routing (`express.Router()`)
- ✅ Built-in middleware (`express.json()`)
- ✅ CORS middleware

### MongoDB
- ✅ Store messages (username + text + timestamp)
- ✅ Insert: `new Message().save()`
- ✅ Find all: `Message.find()`
- ✅ Sort by timestamp: `.sort({ timestamp: 1 })`

### Node.js + MongoDB
- ✅ Mongoose connection (`mongoose.connect()`)
- ✅ Schema definition
- ✅ Model creation
- ✅ CRUD operations (Create + Read)

---

## 🚀 Setup & Installation Guide

### Prerequisites
Before starting, make sure you have installed:
1. **Node.js** (v16 or higher): https://nodejs.org/
2. **MongoDB Community Edition**: https://www.mongodb.com/try/download/community

---

### Step 1: Verify Installations
Open your terminal/command prompt and check:

```bash
# Check Node.js version
node --version
# Should show: v16.x.x or higher

# Check npm version
npm --version
# Should show: 8.x.x or higher

# Check MongoDB version
mongod --version
# Should show version info
```

---

### Step 2: Install Node.js Dependencies

Navigate to the `chat-app` folder in your terminal:

```bash
cd chat-app
npm install
```

This reads `package.json` and installs:
- `express` - Web framework
- `mongoose` - MongoDB library
- `cors` - Allows frontend to talk to backend
- `nodemon` - Auto-restarts server on file change (dev only)

You'll see a `node_modules` folder appear. This is normal!

---

### Step 3: Start MongoDB

**On Windows:**
```bash
# Option 1: If MongoDB is installed as a service (auto-start)
# Just check if it's running in Task Manager > Services > MongoDB

# Option 2: Start manually
mongod
```

**On Mac:**
```bash
# Using Homebrew
brew services start mongodb-community

# Or manually
mongod --config /usr/local/etc/mongod.conf
```

**On Linux:**
```bash
sudo systemctl start mongod
sudo systemctl status mongod  # Check it's running
```

You should see: `Waiting for connections on port 27017`

---

### Step 4: Start the Node.js Server

In your terminal, from the `chat-app` folder:

```bash
# Normal start
npm start

# Development mode (auto-restart on file changes)
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully!
📦 Database: chatapp

🚀 ==========================================
🌐 Server running at: http://localhost:3000
📡 API Endpoints:
   GET  http://localhost:3000/messages
   POST http://localhost:3000/messages
🚀 ==========================================
```

---

### Step 5: Open the Frontend

You have two options:

**Option A: Via the Node.js Server (Recommended)**
Open your browser and visit:
```
http://localhost:3000
```
The Node.js server serves the client files automatically!

**Option B: Direct File (may have CORS issues)**
Open `client/index.html` directly in your browser.
Note: AJAX calls may fail due to CORS. Use Option A instead.

---

## 🧪 Testing the App

1. Open `http://localhost:3000` in your browser
2. Enter your name → Click "Join Chat"
3. Type a message → Click Send (or press Enter)
4. Open another browser tab → Use a different name
5. Both tabs will see each other's messages (auto-refreshes every 3 seconds)

---

## 🔧 API Testing (Optional)

You can test the API using browser, curl, or Postman:

**Test GET (fetch messages):**
```bash
curl http://localhost:3000/messages
```

**Test POST (send message):**
```bash
curl -X POST http://localhost:3000/messages \
  -H "Content-Type: application/json" \
  -d '{"username": "TestUser", "text": "Hello from curl!"}'
```

---

## ❗ Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| `Cannot connect to MongoDB` | Make sure `mongod` is running |
| `Port 3000 already in use` | Change PORT in server.js or kill the other process |
| `node_modules not found` | Run `npm install` in the chat-app folder |
| Messages not loading | Check browser console (F12) for errors |
| CORS errors | Use `http://localhost:3000` not file:// |

---

## 📖 Key Concepts Summary

```
Browser (AngularJS)  ←→  Node.js Server (Express)  ←→  MongoDB
     |                           |                          |
  index.html              server.js                  chatapp DB
  controller.js           routes.js                  messages collection
  service.js ($http)      models/message.js          { username, text, timestamp }
```

**Data flow:**
1. User types message → AngularJS $scope.messageText updates
2. User clicks Send → controller.sendMessage() called
3. ChatService.sendMessage() → $http.post to backend
4. Express POST /messages → saves to MongoDB
5. $interval every 3s → ChatService.getMessages() → $http.get
6. Express GET /messages → reads from MongoDB → returns JSON
7. AngularJS ng-repeat → displays messages in UI

---

Happy Learning! 🎉
