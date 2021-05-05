const express = require('express',);
const fs = require('fs');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const adminHandler = require("./adminHandler/adminHandler");
const userHandler = require("./userHandler/userHandler");

//Dot ENV Use Here
dotenv.config();

/**
 // *****************************************************************************
 let begin = 0;

 function log(msg) {
    if (!begin) {
        begin = Date.now();
    }
    let t = ((Date.now() - begin) / 1000).toFixed(5);
    console.log("" + t + ": " + msg);
}

 log('start program');

 setTimeout(() => log('timer'), 10);
 setImmediate(() => log('immediate'));
 fs.readFile(__filename, () => log('read file'));

 const now = Date.now();
 log('start loop');
 while (Date.now() - now < 1000) {
}
 log('done loop');
 // *****************************************************************************
 */

const app = express();
const adminRoute = express();

app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

// admin.on('mount', function (parent) {
//     console.log('Admin Mounted')
//     console.log(parent) // refers to the parent app
// })
app.route('/api/v1/first')
    .get((req, res) => {
        res.render('pages/first');
    })
    .post((req, res) => {
        res.send('Hello Post');
    })
    .put((req, res) => {
        res.send('Hello Put');
    })
    .delete((req, res) => {
        res.send('Hello Delete');
    })

//Admin Route *********************************
app.use('/admin', adminRoute);

adminRoute.get('/dashboard', adminHandler);

app.get('/user/:id', userHandler);

app.post('/user', (req, res) => {
    console.log(req.body);
    res.send('User POST Here');
});

// app.post('/', (req, res) => {
//     res.send('Hello Post Page');
// });
// app.put('/', (req, res) => {
//     res.send('Hello PUT Page');
// });
// app.delete('/', (req, res) => {
//     res.send('Hello Delete Page');
// });

/** const blog = express()
 const blogAdmin = express()

 app.use('/blogs', blog)
 blog.use('/admins', blogAdmin)

 console.dir(app.path()) // ''
 console.dir(blog.path()) // '/blogs'
 console.dir(blogAdmin.path()) // '/blogs/admins'

 const router = express.Router({
    caseSensitive: true
});
 app.use(router);

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
 */

let PORT = process.env.PORT || 2022;
app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});
