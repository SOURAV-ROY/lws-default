const userHandler = (req, res) => {
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    console.log(req.url);
    console.log(req.path);
    console.log(req.hostname);
    console.log(req.ip);
    console.log(req.method);
    console.log(req.protocol);
    console.log(req.params);
    console.log(req.params.id);
    console.log(req.query);
    console.log(req.cookies);
    console.log('No Signed Cookie Here : ', req.signedCookies);
    console.log(req.secure);
    console.log(req.app.get('view engine'));
    // console.log(req.route);

    //req.accepts() method use here ********************************************
    console.log('Only accept json Data', req.accepts('json').rainbow.bold);
    console.log('Only accept json Data', req.accepts('json').random.bold);
    console.log('Only accept json Data', req.accepts('html'));

    if (req.accepts('html')) {
        res.render();
    } else {
        console.log('No Accept Here!!')
    }

    //req.get() method use here **********************************************
    console.log(req.get('Accept').bgGreen.bold);

    //As like Params ******************************************************
    console.log(req.param('filter').blue.bold);

    res.send('User GET Here');
};

module.exports = userHandler;
