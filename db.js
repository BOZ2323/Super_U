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
