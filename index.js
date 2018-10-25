// this is for the middleware

const express = require('express');
const app = express();
const compression = require('compression');

const db = require("./db.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');


app.use(cookieSession({
    secret: `Feel the fear and do it anyway.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));


app.use(bodyParser.json());


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

app.post('/register', function(req, res) {
    console.log('post request in index.js works!',req.body);
    db.hashedPassword(req.body.password)
        .then(hash => {
            return db.insertNewUser(
                req.body.first,
                req.body.last,
                req.body.email,
                hash

            );
        })
        .then(result => {

            req.session.userId = result['rows'][0].id;
            console.log('req.session.userId',req.session.userId);
            res.json({ success: true });
        })
        .catch(err =>{
            console.log(err.message);
            res.json({ success: false });
        });
});


app.post('/login', (req, res) => {
    console.log("login works!!");
    db.getHashedPasswordfromDB(req.body.email)
        .then(result => {
            console.log("********* req.body.password, result.rows[0].password",req.body.password, result.rows[0].password);
            return db.checkPassword(req.body.password, result.rows[0].password);

            // compares entered password with hashed password
        })
        .then(answer => {
            if (answer) { //if it is true go on here and get the user ID
                console.log("is true: ", answer);
                db.getIdfromDB(req.body.email).then(result => {
                    console.log('result', result);
                    req.session.userId = result.rows[0].id;

                    res.json({ success: true });
                })
                    .catch(err =>{
                        console.log('1', err.message);
                        res.json({ success: false });
                    });
            }
        })
        .catch(err =>{
            console.log('2', err.message);
            res.json({ success: false });
        });

});

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
///////////////////////////////////////////////////////

app.listen(8080, function() {
    console.log("I'm listening.");
});
