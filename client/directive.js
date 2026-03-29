// ============================================================
// directive.js - AngularJS Custom Directives
// ============================================================
// What is a Directive?
// → A directive adds NEW behavior to HTML elements
// → Think of it like creating your own custom HTML attributes
//   or custom HTML tags
//
// Built-in directives: ng-model, ng-repeat, ng-click
// Our custom directive: auto-focus, chat-message
//
// Types of directives:
//   'A' = Attribute  → <div my-directive>
//   'E' = Element    → <my-directive>
//   'C' = Class      → <div class="my-directive">
// ============================================================


// ============================================================
// DIRECTIVE 1: autoFocus
// ============================================================
// Usage in HTML: <input auto-focus>
// Effect: Automatically focuses the input when page loads
//
// This is useful for UX - user doesn't have to click the box
// ============================================================

app.directive('autoFocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A', // 'A' = used as an Attribute

    // link function = runs after directive is attached to DOM
    // element = the actual DOM element (the input box)
    link: function(scope, element, attrs) {

      // $timeout with 0ms = runs after current digest cycle
      // This ensures the element is fully rendered before focusing
      $timeout(function() {
        element[0].focus(); // element[0] = raw DOM element
      }, 0);
    }
  };
}]);


// ============================================================
// DIRECTIVE 2: chatMessage
// ============================================================
// Usage in HTML: <chat-message message="msg" current-user="user">
// Effect: Creates a styled message bubble (own vs others)
//
// This is a component-style directive (reusable chat bubble)
// ============================================================

app.directive('chatMessage', function() {
  return {
    restrict: 'E',   // 'E' = used as an Element tag
    scope: {
      // Isolated scope: directive gets its own scope
      // '=' = two-way binding (pass objects from parent)
      message:     '=',   // The message object { username, text, timestamp }
      currentUser: '='    // Current logged-in username
    },

    // Template = the HTML this directive produces
    // Note the use of AngularJS expressions inside template
    template: `
      <div class="message-wrapper" ng-class="{'own': isOwn(), 'other': !isOwn()}">
        <div class="message-bubble">
          <span class="msg-username" ng-if="!isOwn()">{{ message.username | capitalize }}</span>
          <p class="msg-text">{{ message.text }}</p>
          <span class="msg-time">{{ message.timestamp | timeAgo }}</span>
        </div>
      </div>
    `,

    // Controller inside directive
    // $scope here refers to the directive's ISOLATED scope
    controller: function($scope) {
      // isOwn() checks if message belongs to current user
      $scope.isOwn = function() {
        return $scope.message && $scope.message.username === $scope.currentUser;
      };
    }
  };
});


// ============================================================
// DIRECTIVE 3: enterKey
// ============================================================
// Usage: <input enter-key="sendMessage()">
// Effect: Calls a function when Enter key is pressed
// This makes pressing Enter send the message
// ============================================================

app.directive('enterKey', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      // Listen for 'keydown' event on the element
      element.on('keydown', function(event) {
        // keyCode 13 = Enter key
        if (event.keyCode === 13 && !event.shiftKey) {
          event.preventDefault(); // Prevent newline in input

          // $apply tells AngularJS to run the expression
          // (needed because this is a native DOM event)
          scope.$apply(function() {
            scope.$eval(attrs.enterKey); // Run the function passed in
          });
        }
      });
    }
  };
});