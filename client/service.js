// ============================================================
// service.js - AngularJS Service
// ============================================================
// What is a Service?
// → A service is a reusable piece of code (like a helper)
// → It handles tasks like talking to the backend API
// → Controllers use services instead of doing API calls directly
// → One service can be used by MANY controllers (reusable!)
//
// Think of a service like a waiter in a restaurant:
//   - You (Controller) tell the waiter what you want
//   - Waiter (Service) goes to the kitchen (Backend)
//   - Waiter brings back the food (data)
// ============================================================

// Register service with our 'chatApp' module
// Name: 'ChatService' (this is what we inject into controllers)
// Dependencies: ['$http'] → built-in AngularJS HTTP service

app.service('ChatService', ['$http', function($http) {

  // Base URL of our backend API
  var API_URL = 'http://localhost:3000';

  // ---- Method 1: Get all messages ----
  // Sends GET request to http://localhost:3000/messages
  // Returns a promise (result will come in the future)
  this.getMessages = function() {
    return $http.get(API_URL + '/messages');
    // Returns: { data: [array of messages], status: 200, ... }
  };

  // ---- Method 2: Send a new message ----
  // Sends POST request to http://localhost:3000/messages
  // messageData = { username: "Ali", text: "Hello!" }
  this.sendMessage = function(messageData) {
    return $http.post(API_URL + '/messages', messageData);
    // Returns: { data: savedMessage, status: 201, ... }
  };

}]);