const express = require('express');
const Todo = require('../models/TodoModel');

const todoRouter = express.Router();

// Get @All Todo
todoRouter.get('/', async (req, res) => {
    Todo.find({status: 'active'}).select({
        date: 0,
        __v: 0
    }).limit(2).exec(
        (err, data) => {
            if (!err) {
                res.status(200).json({
                    total: data.length,
                    result: data,
                    message: 'Get All Todos successfully'
                });
            } else {
                res.status(500).json({error: 'There was a severe side error'});
            }
        }
    );
});

todoRouter.get('/:id', async (req, res) => {
    Todo.find({_id: req.params.id}, (err, data) => {
        if (!err) {
            res.status(200).json({
                total: data.length,
                result: data,
                message: 'Get Single Todo By Id successfully'
            });
        } else {
            res.status(500).json({error: 'There was a severe side error For Single Data'});
        }
    })
});

// Single @Todo POST
todoRouter.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if (!err) {
            res.status(200).json({message: 'Todo saved successfully'});
        } else {
            res.status(500).json({error: 'There was a severe side error'});
        }
    })
});

// Many @Todo POST
todoRouter.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if (!err) {
            res.status(200).json({message: 'All Todos saved successfully'});
        } else {
            res.status(500).json({error: 'There was a severe side error'});
        }
    })
});

// Update @Todo
todoRouter.put('/:id', async (req, res) => {
    const todoUpdate = await Todo.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            title: 'Title Update',
            status: 'inactive'
        }
    }, {
        new: true,
        useFindAndModify: false
    }, (error) => {
        if (!error) {
            res.status(200).json({message: 'Todos Updated successfully'});
        } else {
            res.status(500).json({error: 'There was an error'});
        }
    });

    console.log(todoUpdate);
});

todoRouter.delete('/:id', async (req, res) => {
    console.log("Get TODOS");
});

module.exports = todoRouter;
