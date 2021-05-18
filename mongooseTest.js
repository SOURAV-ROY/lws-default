const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

//DB Connect with mongoose ***************
mongoose
    .connect('mongodb://localhost/mongoose21', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongooseTest Connection established'))
    .catch((error) => console.log(error))


function errorHandler(err, req, res, next) {
    if (req.headersSent) {
        return next(err);
    }
    res.status(500).json({error: err});
}


app.listen(2022, () => {
    console.log(`MongooseTest Server Listening on 2022`);
});
