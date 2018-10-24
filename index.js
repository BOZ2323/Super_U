const express = require('express');
const app = express();
const compression = require('compression');
const axios = require('axios');
const db = require("./db.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


/////////////  Davids code with two routes /////////

app.get('/welcome', function(req, res) {
    if (req.session.userId){
        res.redirect('/');
    }else{
        res.sendFile(__dirname + '/index.html');
    }
});


app.get('*', function(req, res) {
    if (!req.session.userId){
        res.redirect('/welcome');
    }else{
        res.sendFile(__dirname + '/index.html');
    }
});
///////////////////////////////////////// till here ////////////////

app.listen(8080, function() {
    console.log("I'm listening.");
});
