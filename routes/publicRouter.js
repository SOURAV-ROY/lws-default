const express = require('express');

const publicRouter = express.Router();

const log = (req, res, next) => {
    console.log("All Log Catch From Here");
    next();
}

// publicRouter.all('*', log);

publicRouter.get('/', (req, res) => {
    res.send("Public Dashboard From Public Router");
})

publicRouter.all('*', log);

publicRouter.get('/login', (req, res) => {
    res.send("Public Login From Public Router");
})

module.exports = publicRouter;
