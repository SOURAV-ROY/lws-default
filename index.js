const express = require('express',);
// const dotenv = require('dotenv');

const app = express();
const admin = express();

// admin.on('mount', function (parent) {
//     console.log('Admin Mounted')
//     console.log(parent) // refers to the parent app
// })

const router = express.Router({
    caseSensitive: true
});
app.use(router);

app.use(express.json());
// app.use(express.raw());
// app.use(express.text());
// app.use(express.urlencoded());

app.use(express.static(`${__dirname}/public/`, {
    index: 'home.html',
}));

app.locals.title = 'My Express App';

app.use('/admin', admin);

app.enable('case sensitive routing');
admin.enable('case sensitive routing');
app.disable('case sensitive routing');
admin.disable('case sensitive routing');

admin.get('/dashboard/hello', (req, res) => {
    console.log(admin.mountpath);
    res.send('Hello Admin Dashboard');
});

app.all('/all', (req, res) => {
    res.send('Accept All Methods Here');
});

app.get('/', (req, res) => {
    // console.log( typeof req.body);
    console.log(app.locals.title);
    res.send('Hello Sourav');
});

app.param('id', (req, res, next, id) => {
    const user = {
        userId: id,
        userName: 'Bangladesh',
    };
    req.userDetails = user;
    next();
});

app.get('/user/:id', (req, res) => {
    console.log(req.userDetails);
    res.send('Single User Route');
});

router.get('/about', (req, res) => {
    // console.log( typeof req.body);
    res.send('About Page');
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
