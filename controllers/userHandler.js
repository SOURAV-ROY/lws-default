const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const todoRouter = express.Router();

// POST User Signup
todoRouter.post('/signup', async (req, res) => {

    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        });
        // save() is a instance method ******************88
        await newUser.save();
        res.status(200).json(
            {message: 'Signup Was Successfully'}
        );
    } catch {
        res.status(500).json(
            {error: 'Signup Failed'}
        );
    }

});

module.exports = todoRouter;
