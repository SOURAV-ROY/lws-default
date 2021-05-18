const express = require('express');

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    console.log(`${new Date(Date.now()).toLocaleString().cyan} - ${req.method.bgBlue.bold} - ${req.originalUrl.bgMagenta} - ${req.protocol.green} - ${req.ip.rainbow}`);
    res.send("Admin Dashboard From Admin Router");
})

adminRouter.get('/login', (req, res) => {
    console.log(`${new Date(Date.now()).toLocaleString().cyan} - ${req.method.bgBlue.bold} - ${req.originalUrl.bgMagenta} - ${req.protocol.green} - ${req.ip.rainbow}`);
    res.send("Admin Login From Admin Router");
})

module.exports = adminRouter;
