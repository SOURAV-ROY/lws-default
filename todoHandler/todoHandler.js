const express = require('express');
const Todo = require('../models/TodoModel');

const todoRouter = express.Router();

todoRouter.get('/', async (req, res) => {
    res.send('Todo Home');
});

todoRouter.get('/:id', async (req, res) => {

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
    await Todo.updateOne({_id: req.params.id}, {
        $set: {
            title: 'Title Update',
            status: 'inactive'
        }
    }, (error) => {
        if (!error) {
            res.status(200).json({message: 'Todos Updated successfully'});
        } else {
            res.status(500).json({error: 'There was an error'});
        }
    })
});

todoRouter.delete('/:id', async (req, res) => {
    console.log("Get TODOS");
});

module.exports = todoRouter;
