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
    res.send('User GET Here');
};

module.exports = userHandler;
