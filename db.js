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
exports.getOppData = function(id) {
    const q = `SELECT  id, first, last, image_url, users_bio FROM super_users WHERE id = $1`;
    const params = [id || null];
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
////////////////// friendship ///////////////////
exports.getFriendship = function(user_id, potential_friend_id) {
    return db.query(
        `SELECT *
        FROM friendships
        WHERE (sender_id = $1 AND receiver_id = $2)
        OR (receiver_id = $1 AND sender_id = $2);
        `,
        [user_id, potential_friend_id]
    )
        .then(function (results) {
            return results.rows[0];
        });
};

exports.sendFriendRequest = function(sender_id, receiver_id) {
    return db.query(
        `INSERT INTO friendships
        (sender_id, receiver_id)
        VALUES ($1, $2)
        RETURNING *;
        `,
        [sender_id, receiver_id]
    )
        .then(function (results) {
            return results.rows[0];
        });
};

exports.acceptFriendRequest = function(sender_id, receiver_id) {
    return db.query(
        `UPDATE friendships
        SET accepted = true
        WHERE (receiver_id=$1 AND sender_id = $2)
        OR (sender_id=$1 AND receiver_id = $2)
        RETURNING receiver_id, sender_id, accepted, id;
        `,
        [sender_id, receiver_id]
    )
        .then(function (results) {
            return results.rows[0];
        });
};

exports.endFriendship = function(sender_id, receiver_id) {
    return db.query(
        `DELETE FROM friendships
        WHERE (receiver_id=$1 AND sender_id = $2)
        OR (sender_id=$1 AND receiver_id = $2);
        `,
        [sender_id, receiver_id]
    )
        .then(function (results) {
            return results.rows[0];
        });
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

exports.getFriendsOrWannabees = function(id) {
    return db
        .query(
            `SELECT super_users.id, first, last, image_url, accepted
    FROM friendships
    JOIN super_users
    ON (accepted = false AND receiver_id = $1 AND sender_id = super_users.id)
    OR (accepted = true AND receiver_id= $1 AND sender_id = super_users.id)
    OR (accepted = true AND sender_id = $1 AND receiver_id = super_users.id)
`,
            [id || null]
        )
        .then(data => {
            console.log("result getFriendsOrWannabees:", data.rows);
            return data.rows;
        });
};

exports.getUsersByIds = function (arrayOfIds) {
    const query = `SELECT id, first, last, image_url FROM super_users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds]);
};
