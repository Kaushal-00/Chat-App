// ============================================================
// app.js - AngularJS Module Definition
// ============================================================
// This is the ROOT file of our AngularJS frontend application.
//
// What is a Module?
// → A module is a container that groups related code together
// → Think of it like a box that holds all our AngularJS pieces
// → Every AngularJS app must have at least one module
//
// 'chatApp' is the name of our module. It is used in HTML:
//    <html ng-app="chatApp">
// ============================================================

// angular.module(name, dependencies)
//   name         = 'chatApp' → the name we use in ng-app
//   dependencies = []        → no external modules needed

var app = angular.module('chatApp', []);

// ============================================================
// CUSTOM FILTER - timeAgo
// ============================================================
// Filters transform how data is DISPLAYED (not the data itself)
// Built-in example: {{ price | currency }} → shows $10.00
//
// Our custom filter: converts timestamp → "2 minutes ago"
// Usage in HTML: {{ message.timestamp | timeAgo }}
// ============================================================

app.filter('timeAgo', function() {
  // The filter returns a function that takes a value
  return function(timestamp) {
    // If no timestamp, return empty string
    if (!timestamp) return '';

    var now = new Date();
    var then = new Date(timestamp);

    // Calculate difference in seconds
    var seconds = Math.floor((now - then) / 1000);

    // Return human-readable time
    if (seconds < 5)   return 'just now';
    if (seconds < 60)  return seconds + ' sec ago';

    var minutes = Math.floor(seconds / 60);
    if (minutes < 60)  return minutes + ' min ago';

    var hours = Math.floor(minutes / 60);
    if (hours < 24)    return hours + ' hr ago';

    var days = Math.floor(hours / 24);
    return days + ' day' + (days > 1 ? 's' : '') + ' ago';
  };
});


// ============================================================
// CUSTOM FILTER - capitalize
// ============================================================
// Capitalizes the first letter of a string
// Usage: {{ message.username | capitalize }}
// ============================================================

app.filter('capitalize', function() {
  return function(text) {
    if (!text) return '';
    // Take first letter, uppercase it, add rest of string
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
});