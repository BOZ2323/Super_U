const spicedPg = require('spiced-pg');
//this when we create a secret.json with password and stuff, for git ignore
// const { dbUser, dbPassword } = require('./secrets');

let secrets;
let dbUrl;
//if production the first, if development the second db will be activated;
if (process.env.NODE_ENV === 'production') {
    secrets = process.env;
    dbUrl = process.env.DATABASE_URL;
} else {
    secrets = require('./secrets');
    dbUrl = `postgres://${secrets.spicedling}:${secrets.password}@localhost:5432/petition`;
}

const bcrypt = require('bcryptjs');

const db = spicedPg(dbUrl);



module.exports.hashedPassword = function(plainTextPassword) {
    return new Promise(function(res, rej) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return rej(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return rej(err);
                }
                console.log(
                    'plainTextPassword: ', plainTextPassword,
                    'salt: ', salt,
                    'hash: ', hash
                );
                res(hash);
            });
        });
    });
};

exports.getHashedPasswordfromDB = function(email){
    let q = `SELECT password FROM super_users WHERE email = $1`;
    let params = [email];
    return db.query(q, params);

};
exports.checkPassword = function(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
};


module.exports.insertNewUser = function(first, last, email, password) {
    const q = `
    INSERT INTO super_users
    (first, last, email, password)
    VALUES
    ($1, $2, $3, $4)
    RETURNING id
    `;

    const params = [
        first || null,
        last || null,
        email || null,
        password || null
    ];
    console.log("insertNewUser fired!");
    return db.query(q, params);
};

exports.getIdfromDB = function(email){
    let q = `SELECT * FROM super_users WHERE email = $1`;
    let params = [email];
    return db.query(q, params);

};
exports.getUserById = function(id){
    let q = `SELECT * FROM super_users WHERE id = $1`;
    let params = [id];
    return db.query(q, params);

};
exports.saveBio = function(users_bio, id) {
    const q = `
    UPDATE super_users
    set users_bio = $1
    WHERE id=$2
    RETURNING users_bio
    `;
    const params = [
        users_bio || null,
        id || null
    ];
    return db.query(q, params);
};


exports.upload = function(image_url, id) {
    const q = `
    UPDATE super_users set image_url = $1
    WHERE id = $2
    returning *
        `;

    const params = [image_url, id];
    return db.query(q, params);
};
