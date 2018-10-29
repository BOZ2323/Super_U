// this is for the middleware
const express = require('express');
const app = express();

var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');
const s3url = require('./config.json');
const s3 = require('./s3.js');

var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) { //generates a unique id
            callback(null, uid + path.extname(file.originalname)); //null instead of err, because cb. pass the cb the path where the file should go, extname gives you just the extension
        });
    }
});

var uploader = multer({ //you call multer and pass it an obj with the obj just created. you give it limits, when to reject the file, eg: filesize
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});


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
app.use(express.static('public'));


app.post('/user', function (req, res){
    console.log('/user server post works!',req.body);
    db.getUserById(req.session.userId)
        .then(function({rows}){
            res.json(rows[0]);
        });
});


app.post('/register', function(req, res) {
    console.log('/user server post works!');
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
            return db.checkPassword(req.body.password, result.rows[0].password);

            // compares entered password with hashed password
        })
        .then(answer => {
            if (answer) { //if it is true go on here and get the user ID
                console.log("is true: ", answer);
                db.getIdfromDB(req.body.email).then(result => {
                    // console.log('result', result);
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
app.post('/upload', uploader.single('file'), s3.upload, function(req, res) {
    // If nothing went wrong the file is already in the uploads directory
    console.log(req.body);

    const imgUrl = s3url.s3Url + req.file.filename;
    console.log("url of new image",imgUrl);
    console.log("s3url", s3url, req.session);
    db.upload(imgUrl, req.session.userId)
        .then(result => {
            res.json(result.rows);
            console.log('result.rows', result.rows);
        });
});

app.get('/welcome', function(req, res) {
    if (req.session.userId){
        res.redirect('/');
    }else{
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('/user', function (req, res){
    console.log('/user server get works!',req.body);
    db.getUserById(req.session.userId)
        .then(function({rows}){
            res.json(rows[0]);
        });
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
