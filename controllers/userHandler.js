const express = require('express');
const User = require('../models/UserModel');

const todoRouter = express.Router();

// Get @Todo All
todoRouter.get('/', (req, res) => {
    res.send('User handler');
});

module.exports = todoRouter;
