const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const userRouter = express.Router();

// POST User Signup
userRouter.post('/signup', async (req, res) => {

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

// POST User Login
userRouter.post('/login', async (req, res) => {
    try {
        const findUser = await User.find({username: req.body.username});

        if (findUser && findUser.length > 0) {

            const isValidPassword = await bcrypt.compare(req.body.password, findUser[0].password);

            if (isValidPassword) {
                // Generate JWT Token And Login
                const token = jwt.sign({
                    name: findUser[0].name,
                    username: findUser[0].username,
                    userId: findUser[0]._id
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });

                res.status(200).json({
                    'access_token': token,
                    'message': 'Login successful'
                })
            } else {
                res.status(401).json(
                    {error: 'Authentication Failed'}
                );
            }
        } else {
            res.status(401).json(
                {error: 'Authenticated Error'}
            );
        }
    } catch (error) {
        res.status(401).json(
            {error: 'Authenticated Error In Catch Block'}
        );
        console.log(error);
    }
});

// GET All Users
userRouter.get('/all', async (req, res) => {

    try {
        const users = await User.find(
            {status: 'active'}
        ).populate('todos', 'title description status user date -_id');

        res.status(200).json(
            {
                total: users.length,
                data: users,
                message: 'Get All Users Successfully'
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {error: 'Users Get Failed'}
        );
    }

});

module.exports = userRouter;
