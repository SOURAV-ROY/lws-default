const express = require('express');

const publicRouter = express.Router();

publicRouter.get('/', (req, res) => {
    res.send("Public Dashboard From Public Router");
})

publicRouter.get('/login', (req, res) => {
    res.send("Public Login From Public Router");
})

module.exports = publicRouter;
