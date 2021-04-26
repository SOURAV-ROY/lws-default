const express = require('express',);
// const dotenv = require('dotenv');

const app = express();

app.use(express.json());
// app.use(express.raw());
// app.use(express.text());
// app.use(express.urlencoded());

app.use(express.static(`${__dirname}/public/`, {
    index: 'home.html',
}));

app.get('/', (req, res) => {
    // console.log( typeof req.body);
    res.send('Hello Sourav');
});

app.post('/', (req, res) => {
    // console.log(req.body.toString());
    console.log(req.body);
    res.send('This is post url with method');
});

let PORT = process.env.PORT || 2021;
app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});
