const express = require('express',);
require('dotenv');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Sourav');
});

app.post('/', (req, res) => {
    res.send('This is post url with method');
});

let PORT = process.env.PORT || 2021;
app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});
