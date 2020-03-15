const express = require('express');
const db = require('./db');

// create express instance
const app = express()

// init body-parser options (inbuilt with express)
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// require & import api routes
const user = require('./routes/users');
const articles = require('./routes/articles');

// Use API Routes
app.use(user);
app.use(articles);

// Export the server middleware
module.exports = {
    path: '/api',
    handler: app
}