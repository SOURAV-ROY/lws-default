const express = require('express');

const publicRouter = express.Router();

const log = (req, res, next) => {
    console.log("All Log Catch From Here");
    next();
}

// publicRouter.all('*', log);

// publicRouter.param('user', (req, res, next, id) => {
//     req.user = id === '1' ? 'SOURAV' : 'Anonymous';
//     console.log('I am call once time');
//     next();
// });

publicRouter.param((param, option) => (req, res, next, value) => {
    if (value === option) {
        next();
    } else {
        res.sendStatus(403);
    }
})

publicRouter.param('user', '10');

// publicRouter.get('/:user', (req, res, next) => {
//     console.log('Another call same route');
//     next();
// })

publicRouter.get('/:user', (req, res) => {
    // res.send(`Hello ${req.user}`);
    res.send(`Hello SOURAV`);
})

publicRouter.get('/', (req, res) => {
    res.send("Public Dashboard From Public Router");
})

publicRouter.all('*', log);

publicRouter.get('/login', (req, res) => {
    res.send("Public Login From Public Router");
})

module.exports = publicRouter;
