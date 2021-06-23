const express = require('express',);
const fs = require('fs');
const path = require('path');
require('colors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const adminHandler = require("./adminHandler/adminHandler");
const userHandler = require("./userHandler/userHandler");
const adminRouter = require('./routes/adminRouter');
const publicRouter = require("./routes/publicRouter");
const chalk = require('chalk');

const log = console.log;

// Combine styled and normal strings
log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// Compose multiple styles using the chainable API
log(chalk.blue.bgRed.bold('Hello world!'));

// Pass in multiple arguments
log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// Nest styles
log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

// Nest styles of the same type even (color, underline, background)
log(chalk.green(
    'I am a green line ' +
    chalk.blue.underline.bold('with a blue substring') +
    ' that becomes green again!'
));

// ES2015 template literal
log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);

// Use RGB colors in terminal emulators that support it.
log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
log(chalk.hex('#DEADED').bold('Bold gray!'));


//Dot ENV Use Here
dotenv.config();

/*********************************************************************************
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
 **********************************************************************************/


// FIle Upload From Here
const UPLOADS_FOLDER = './fileUpload/uploads';

//Define the storage ***************************
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        // File name generate from here
        const fileExt = path.extname(file.originalname);
        const filename = file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(' ')
            .join('-') + '-' + Date.now();

        cb(null, filename + fileExt);
    }
})

let upload = multer(
    {
        storage: storage,
        limits: {
            fileSize: 1000000 // 1MB => File Upload Less than 1 MB MUST
        },

        fileFilter: (req, file, cb) => {
            console.log(file);

            if (file.fieldname === "avatar") {
                if (
                    file.mimetype === "image/png" ||
                    file.mimetype === "image/jpg" ||
                    file.mimetype === "image/jpeg"
                ) {
                    cb(null, true);
                } else {
                    cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
                }
            } else if (file.fieldname === "doc") {
                if (file.mimetype === "application/pdf") {
                    cb(null, true);
                } else {
                    cb(new Error("Only .pdf format allowed!"));
                }
            } else {
                cb(new Error("There was an unknown error!"));
            }
        },
    });


// Express Ap RUN From Here *******************
const app = express();
// const adminRouter = express();

// File Upload From Here *******************************************

// app.post('/fileupload', upload.array('avatar', 3), (req, res) => {
// app.post('/fileupload', upload.none(), (req, res) => {
// app.post('/fileupload', upload.single('avatar'), (req, res) => {

// app.post('/fileupload', upload.fields(
//     [
//         {name: 'avatar', maxCount: 1},
//         {name: 'doc', maxCount: 1}
//     ]
// ), (req, res) => {
//
//
//     res.send('File Upload Successful DONE');
// });

app.post(
    "/fileupload",
    upload.fields([
        {
            name: "avatar",
            maxCount: 2,
        },
        {
            name: "doc",
            maxCount: 1,
        },
    ]),
    (req, res, next) => {
        console.log(req.files);
        res.send("File Upload success");
    }
);

// ALL Here Middleware *****************************************
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

const loggerWrapper = (options) =>
    function (req, res, next) {
        if (options.log) {
            console.log(`${new Date(Date.now()).toLocaleString().cyan} - ${req.method.bgBlue.bold} - ${req.originalUrl.bgMagenta} - ${req.protocol.green} - ${req.ip.rainbow}`);
            next();
        } else {
            throw new Error('This is an error through Middleware');
        }
    };

/***********************************************************************************
 // Create Logger Middleware Here *******************************
 const logger = (req, res, next) => {
    console.log(`${new Date(Date.now()).toLocaleString().cyan} - ${req.method.bgBlue.bold} - ${req.originalUrl.bgMagenta} - ${req.protocol.green} - ${req.ip.rainbow}`);
    // res.end()
    next();

    // throw new Error('This is an error through Middleware');
}
 ************************************************************************************/

const errorMiddleware = (error, req, res, next) => {
    console.log(error.message);
    res.status(500).send('There was a server error Middleware');
};

// Use Logger Middleware **********************
// adminRouter.use(logger);

adminRouter.use(loggerWrapper({log: true}));
// adminRouter.use(loggerWrapper({log: false}));
adminRouter.use(errorMiddleware);


// Admin Router Here **************************
app.use('/admin', adminRouter);

// public Router Here *************************
app.use('/public', publicRouter);

adminRouter.get('/dashboard', adminHandler);

app.get('/user/:id', userHandler);

app.post('/user', (req, res) => {
    console.log(req.body);
    res.send('User POST Here');
});

app.get('/about', (req, res) => {

    // console.log(res.headersSent);
    // console.log(res.locals);

    res.send('About Page Here');
    res.end();

    // res.render('pages/about', {
    //     name: "SOURAV ROY"
    // });

    // console.log(res.headersSent);
    // console.log(res.locals);

    /**************************************************************************
     res.json({
        title: 'Sourav Title'
    });
     res.status(200);
     res.end(); // After res.status() res.end() MUST ****************
     **************************************************************************/

    // res.sendStatus(200);
    /****************************************************************************
     res.format({
        'text/plain': () => {
            res.send('Hi Plane Text Here');
        },
        'text/html': () => {
            res.render('pages/about', {
                name: "Res Format Is Awesome"
            });
        },
        'application/json': () => {
            res.json({
                msg: 'JSON Format Is Awesome'
            })
        },
        default: () => {
            res.status(406).send('Formatted Data Is not acceptable');
        }
    })
     **************************************************************************/

    // res.cookie('name', 'SetMyPersonalCookie');
    // res.location('/testLocation');
    // res.redirect('/test');
    // res.end('Cookie Set Successful');
    /******************************************************************
     res.set('Platform', 'Learn With Sourav Default');
     console.log('Response Get From res.set() -> ',res.get('Platform'));
     res.end();
     *******************************************************************/

});
/************************************************************************
 app.get('/', (req, res) => {
    res.send('Hello 2021');
    // res.send(a);
    throw new Error('Create Some Error Here By Myself');
});
 ************************************************************************/

// app.delete('/', (req, res) => {
//     res.send('Hello Delete Page');
// });

/*************************************************************************
 const blog = express()
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
 ******************************************************************************/

/*******************************************************************************
 app.get('/loop', (req, res, next) => {
    for (let i = 0; i <= 5; i++) {
        if (i === 5) {
            next("Here Is An Error");
        } else {
            res.write('a');
        }
    }
    res.end();
})

 //4040 Error Bundler ********************************
 app.use((req, res, next) => {
    // res.status(404).send('Requested URL not found');
    next('Requested URL not found');
});
 ****************************************************************************/
/****************************************************************************************
 app.get('/file', (req, res, next) => {
    // fs.readFileSync('/file-deosnot-exist', (error, data) => {
    fs.readFile('/file-does-not-exist', 'utf-8',(error, data) => {
        // Async Error Handler Here ******************
        console.log(data);
        next(error);
        // console.log(data.property);
        if (error) {
            next(error);
        } else {
            res.send(data);
        }
    })
});
 *******************************************************************************************/

// Async Error Handle Is Awesome **********************
app.get('/file', [
        (req, res, next) => {
            fs.readFile('/file-does-not-exist', 'utf-8', (error, data) => {
                // Async Error Handler Here ******************
                console.log(data);
                next(error);
            });
        },

        (req, res, next) => {
            console.log(data.property);
        }
    ]
);

/********************************************************************************
 app.get('/a', (req, res, next) => {
    setTimeout(function () {
        try {
            console.log(a)
            // res.send('Print A In Body');
        } catch (error) {
            next(error);
        }
    }, 1000)
});
 *********************************************************************************/

// app.use((req, res, next) => {
//     console.log('I am not called');
//     next();
// })

// default error handler
app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send("There was an upload error!");
        } else {
            res.status(500).send(err.message);
        }
    } else {
        res.send("success");
    }
});

/**
 // Invisible default error handling middleware *********
 app.use((error, req, res, next) => {
    // console.log(error);
    // console.log("Error Handling it is known");
    // res.status(500).send('There Was an Error Created By Me');
    if (res.headersSent) {
        next('There was a headers Problem');
    } else {
        if (error.message) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('There Was an Error Created By Me');
        }
    }
});
 */

let PORT = process.env.PORT || 2022;
app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
});
