const express = require('express');
const Todo = require('../models/TodoModel');
const checkLogin = require('../middlewares/checkLogin');

const todoRouter = express.Router();

// Get @Todo All
todoRouter.get('/', checkLogin, (req, res) => {
    console.log(req.name);
    console.log(req.username);
    console.log(req.userId);

    Todo.find({status: 'active'}).select({
        date: 0,
        __v: 0
    }).limit(10).exec(
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

//GET Active @Todo
todoRouter.get('/active', async (req, res) => {
    const activeTodo = new Todo();
    const data = await activeTodo.findActive();

    res.status(200).json({
        total: data.length,
        data
    })
});

// Find Active with Callback
todoRouter.get('/active-callback', (req, res) => {
    const inactiveTodo = new Todo();

    inactiveTodo.findActiveCallback((error, data) => {
        res.status(200).json({
            total: data.length,
            data
        })
    });
});

//GET JS From @Todo Using Static Method
todoRouter.get('/js', async (req, res) => {
    const data = await Todo.findByJS();

    res.status(200).json({
        total: data.length,
        data
    })
});

//GET @Todo By Language
todoRouter.get('/language', async (req, res) => {
    const data = await Todo.find().byLanguage('node');

    res.status(200).json({
        total: data.length,
        data
    })
});

//Single @Todo GET
todoRouter.get('/:id', async (req, res) => {

    try {
        const data = await Todo.find({_id: req.params.id});
        res.status(200).json({
            total: data.length,
            result: data,
            message: 'Get Single Todo By Id successfully'
        });
    } catch (error) {
        res.status(500)
            .json({
                error: 'There was a severe side error For Single Data'
            });
    }
});

/**************************************************************************
 // Single @Todo POST
 todoRouter.post('/', checkLogin, async (req, res) => {
    const newTodo = new Todo(req.body);
    // save() is a instance method ********************
    await newTodo.save((err) => {
        if (!err) {
            res.status(200).json({message: 'Todo saved successfully'});
        } else {
            res.status(500).json({error: 'There was a severe side error'});
        }
    })
});
 ****************************************************************************/

// Single @Todo POST
todoRouter.post('/', checkLogin, async (req, res) => {
    const newTodo = new Todo(
        {
            ...req.body,
            user: req.userId
        }
    );

    try {
        // save() is a instance method ********************
        await newTodo.save();
        res.status(200).json(
            {message: 'Todo saved successfully'}
        );
    } catch (errors) {
        console.log(errors);
        res.status(500).json(
            {error: 'There was a severe side error'}
        );
    }
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

// Delete Single @Todo
todoRouter.delete('/:id', async (req, res) => {
    Todo.deleteOne({_id: req.params.id}, (err) => {
        if (!err) {
            res.status(200).json({
                message: 'Single Todo deleted successfully'
            });
        } else {
            res.status(500).json({error: 'There was a severe side error For Single Data'});
        }
    })
});

module.exports = todoRouter;
