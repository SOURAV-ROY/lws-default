const adminHandler = (req, res) => {
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    console.log(req.url);
    console.log(req.path);
    console.log(req.hostname);
    console.log(req.ip);
    console.log(req.method);
    console.log(req.protocol);
    console.log(req.params);
    console.log(req.secure);
    res.send('This is admin dashboard url');
}

module.exports = adminHandler;
