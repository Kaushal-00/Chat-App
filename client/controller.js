// ============================================================
// controller.js - AngularJS Controller
// ============================================================
// What is a Controller?
// → A controller is the BRAIN of your AngularJS page
// → It holds all the data ($scope variables)
// → It handles user actions (button clicks, form submit)
// → It talks to the Service to get/send data
//
// $scope = the "glue" between HTML and JavaScript
//   - Variables on $scope are accessible in HTML
//   - Example: $scope.name = "Ali" → {{ name }} shows "Ali"
//
// Dependencies injected: $scope, $interval, ChatService
//   - $scope    = two-way data binding object
//   - $interval = like setInterval() but AngularJS-aware
//   - ChatService = our custom service for API calls
// ============================================================

app.controller('ChatController', ['$scope', '$interval', 'ChatService',
function($scope, $interval, ChatService) {

  // ============================================================
  // SCOPE VARIABLES (Data that HTML can see)
  // ============================================================

  $scope.username   = '';          // Stores typed username
  $scope.messageText = '';         // Stores typed message
  $scope.messages   = [];          // Array of all chat messages
  $scope.errorMsg   = '';          // Error message to display
  $scope.isLoading  = false;       // Shows loading spinner
  $scope.usernameSet = false;      // Has user entered their name?
  $scope.currentUser = '';         // The logged-in username


  // ============================================================
  // FUNCTION 1: Set Username
  // ============================================================
  // Called when user clicks "Join Chat" button
  // Validates that username is not empty

  $scope.setUsername = function() {
    // Trim removes spaces from start/end
    var name = $scope.username.trim();

    // Validation: username must not be empty
    if (!name) {
      $scope.errorMsg = 'Please enter your name to join the chat!';
      return; // Stop here, don't proceed
    }

    // Username is valid → set it and show the chat
    $scope.currentUser = name;
    $scope.usernameSet = true;
    $scope.errorMsg = '';

    // Load messages immediately after joining
    $scope.loadMessages();
  };


  // ============================================================
  // FUNCTION 2: Load Messages from Backend
  // ============================================================
  // Calls our ChatService to GET messages from the API
  // This is called on page load AND every few seconds (polling)

  $scope.loadMessages = function() {
    // Call the service → which calls GET /messages
    ChatService.getMessages()
      .then(function(response) {
        // SUCCESS: response.data = array of messages from MongoDB
        $scope.messages = response.data;
        $scope.errorMsg = '';

        // Auto-scroll to bottom after messages load
        // Small timeout lets DOM update first
        setTimeout(function() {
          var chatBox = document.getElementById('chat-messages');
          if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
          }
        }, 100);
      })
      .catch(function(error) {
        // ERROR: Something went wrong with the API call
        console.error('Failed to load messages:', error);
        $scope.errorMsg = 'Could not load messages. Is the server running?';
      });
  };


  // ============================================================
  // FUNCTION 3: Send a Message
  // ============================================================
  // Called when user clicks "Send" button or presses Enter
  // Validates input, then POSTs to backend, then reloads messages

  $scope.sendMessage = function() {
    // Get text, trimmed of whitespace
    var text = $scope.messageText.trim();

    // Validation 1: Must be logged in (have a username)
    if (!$scope.usernameSet) {
      $scope.errorMsg = 'Please set your username first!';
      return;
    }

    // Validation 2: Message cannot be empty
    if (!text) {
      $scope.errorMsg = 'Message cannot be empty!';
      return;
    }

    // Prepare the data object to send to backend
    var messageData = {
      username: $scope.currentUser,
      text: text
    };

    $scope.isLoading = true;   // Show loading state
    $scope.errorMsg = '';      // Clear previous errors

    // Call service → which calls POST /messages
    ChatService.sendMessage(messageData)
      .then(function(response) {
        // SUCCESS: Message was saved in MongoDB
        $scope.messageText = ''; // Clear the input box
        $scope.isLoading = false;

        // Reload messages to show the new one
        $scope.loadMessages();
      })
      .catch(function(error) {
        // ERROR: Failed to send message
        console.error('Failed to send message:', error);
        $scope.errorMsg = 'Failed to send message. Please try again.';
        $scope.isLoading = false;
      });
  };


  // ============================================================
  // FUNCTION 4: Handle Enter Key Press
  // ============================================================
  // When user presses Enter in message box, send the message

  $scope.handleKeyPress = function(event) {
    // keyCode 13 = Enter key
    if (event.keyCode === 13 && !event.shiftKey) {
      $scope.sendMessage();
    }
  };


  // ============================================================
  // FUNCTION 5: Check if message is from current user
  // ============================================================
  // Used to apply different CSS class (own vs others)

  $scope.isOwnMessage = function(message) {
    return message.username === $scope.currentUser;
  };


  // ============================================================
  // AUTO-POLLING: Refresh messages every 3 seconds
  // ============================================================
  // This simulates "real-time" by constantly checking for new messages
  // $interval is AngularJS's version of setInterval()
  //   - First arg:  function to run
  //   - Second arg: how often in milliseconds (3000 = 3 seconds)

  var pollingInterval = $interval(function() {
    // Only poll if user has joined the chat
    if ($scope.usernameSet) {
      $scope.loadMessages();
    }
  }, 3000); // Every 3 seconds


  // ============================================================
  // CLEANUP: Stop polling when page/controller is destroyed
  // ============================================================
  // $destroy event fires when the controller is removed
  // We cancel the interval to prevent memory leaks

  $scope.$on('$destroy', function() {
    if (pollingInterval) {
      $interval.cancel(pollingInterval);
    }
  });

  // Load messages once on startup (initial load)
  $scope.loadMessages();

}]); // End of Controller