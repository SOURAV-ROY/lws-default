const express = require('express');

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.send("Admin Dashboard From Admin Router");
})

adminRouter.get('/login', (req, res) => {
    res.send("Admin Login From Admin Router");
})

module.exports = adminRouter;
