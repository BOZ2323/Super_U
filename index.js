// this is for the middleware
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });

// const io = require('socket.io')(server, { origins: 'localhost:8080 mycorrecthorsemuffin' });


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


// app.use(cookieSession({
//     secret: `Feel the fear and do it anyway.`,
//     maxAge: 1000 * 60 * 60 * 24 * 14
// }));


const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});


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
    // console.log("login works!!");
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
            console.log("result.rows",result.rows)
            res.json(result.rows);

        });
});
////////////// opp /////////////////////////////////////////
app.get('/opp.json/:id', (req, res)=> {
    db.getOppData(req.params.id)
        .then(results => {

            res.json(results.rows[0]);
        }).catch(err=> {
            console.log(err.message);
        });
});

/////////////// make friendsrequest /////////////////////



app.get('/friendship-status', function(req, res) {
    db.getFriendship(req.session.userId, req.query.id)
        .then(results => {
            res.json(results);
        })
        .catch(err => {console.log(err);});
});

app.post('/send-friend-request', function(req, res) {
    console.log('made it to send friend request')
    db.sendFriendRequest(req.session.userId, req.body.id)
        .then(results => {
            console.log('json results', results);
            res.json(results);
        })
        .catch(err => {console.log(err);});
});

//// accepting friends request ////////

app.post('/accept-friend-request', function(req, res) {

    console.log("sender, receiver",req.session.userId, req.body.id);
    db.acceptFriendRequest(req.session.userId, req.body.id)
        .then(results => {
            res.json(results);
        })
        .catch(err => {console.log(err);});
});


//// ending friendship ////////

app.post('/end-friendship', function(req, res) {
    db.endFriendship(req.session.userId, req.body.receiver_id)
        .then(results => {
            res.json(results);
        })
        .catch(err => {console.log(err);});
});





////////////// bio /////////////////////////////////////////
app.post('/add-bio.json', (req, res)=> {
    console.log('req.body', req.body, req.session.userId);
    db.saveBio(req.body.bio, req.session.userId)
        .then(results => {
            console.log('results of saveBio:', results.rows[0]);
            res.json(results.rows[0]);
        }).catch(err=> {
            console.log(err.message);
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
////////////// friends or wannabees ///////////////

app.get("/friendsOrWannabees", function(req, res) {
    return db.getFriendsOrWannabees(req.session.userId).then(data => {
        console.log("friendsOrWannabees req.session.userId:", req.session.userId);
        console.log("friendsOrWannabees server result data:", data);
        res.json({ data });
    }).catch(err =>{
        console.log("serverside err friendsOrWannabees: ", err);
    });
});

app.get('/logout', (req, res) => {
    req.session = null;
    console.log('SESSION:', req.session);
    res.redirect('/');
});


app.get('*', function(req, res) {
    if (!req.session.userId){
        res.redirect('/welcome');
    }else{
        res.sendFile(__dirname + '/index.html');
    }
});

///////////////////////////////////////////////////////

server.listen(8080, function() {
    console.log("I'm listening.");
});
////////////// socket io /////////////////////
let onlineUsers = [];



io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    // socket.request.session.user.id
    console.log("socket.request.session",socket.request.session); // shows userId and everything in the session

    onlineUsers.push({
        userId: socket.request.session.userId,
        socketId: socket.id
    });





    console.log('onlineUsers', onlineUsers);


    let ids = onlineUsers.map(user => {
        return user.userId; //array of userIds that was extracted from onlineUsers array

    });
    //////////// user who joined //////////////

    let counter = 0;

    for(let i=0; i<onlineUsers.length; i++){
        if (onlineUsers[i].userId === socket.request.session.userId){
            counter ++;
        }
    }
    if (counter === 1){
        db.getUserWhoJoined(socket.request.session.userId).then(results => {
            // console.log("USER WHO JOINED RESULTS", results.rows);

            socket.broadcast.emit('userJoined', results.rows[0]); // emit to socket.io an event call onlineUsersevent and send along the payload results.rows.
        }).catch(err=> {
            console.log('error in socket.io userJoined',err.message);
        });
    }
    //////////// user who left //////////////

    // socket.broadcast.emit('userJoined', results.rows[0]);



    db.getUsersByIds(ids).then(results => {
        console.log("results emitted to onlineUserEvent", results.rows);
        socket.emit('onlineUsersEvent', results.rows); // emit to socket.io an event call onlineUsersevent and send along the payload results.rows.
    });

    socket.on('newMessage', function(message){
        console.log("new message: ", message);
        db.saveMessages(socket.request.session.userId, message).then(chatMessages => {
            console.log('results getMessageFromDb', chatMessages.rows[0].id);
            db.getUserById(socket.request.session.userId)
                .then(chatter => {
                    // console.log('RESULT of getUserById for CHAT: ', chatter);
                    let chatterObj= {
                        first: chatter.rows[0].first,
                        last: chatter.rows[0].last,
                        img_url: chatter.rows[0].img_url,
                        created_at: chatMessages.rows[0].created_at,
                        message: chatMessages.rows[0].message
                    };
                    console.log('CHATTER OBJ: ', chatterObj);
                    io.sockets.emit('displayMessage', chatterObj);
                })

                .catch(err => {
                    console.log('ERR in saveMessages: ', err.message);
                });
        // get the user's first, last, profile picture
        //if you are using the arraay method, store new obj in our array.
        // if db solution, insert the new chat messsage into our chats table1
        // both methods require us to have create object that contains usrs firstname
        //last, profile pic, message
        });
    });


    db.showLastTenMessages()
        .then(tenMessages => {
            // console.log("tenMessages:", tenMessages);
            io.sockets.emit("showLastTenMessages", tenMessages.reverse());
        })
        .catch(err => {
            console.log("err in tenMessages ", err.message);
            return;
        });


    socket.on('disconnect', function(){
        onlineUsers = onlineUsers.filter(
            user => user.socketId != socket.id
        );
        let indexOfUser = onlineUsers.findIndex(function(item){
            return item.userId == socket.request.session.userId;
        });

        if (indexOfUser === -1) {
            console.log('indexOfUser',indexOfUser);
            io.sockets.emit("userLeft", socket.request.session.userId);
        }


    }); //socket.on


});
