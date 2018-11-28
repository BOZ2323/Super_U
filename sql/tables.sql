

-- // ALTER TABLE users DROP UNIQUE image_id DROP INDEX;

DROP TABLE IF EXISTS super_users;
CREATE TABLE super_users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image_url VARCHAR (500),
    users_bio VARCHAR (2000)
);


DROP TABLE IF EXISTS chats;

CREATE TABLE chats (
   id SERIAL PRIMARY KEY,
   sender_id INT NOT NULL REFERENCES super_users(id),
   message VARCHAR(1000),
   posted_date VARCHAR(500),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS friendships;
CREATE TABLE friendships (
   id SERIAL PRIMARY KEY,
   sender_id INT NOT NULL REFERENCES super_users(id),
   receiver_id INT NOT NULL REFERENCES super_users(id),
   accepted BOOLEAN DEFAULT false
);




UPDATE super_users
SET image_url = 'http://img.filmsactu.net/datas/films/p/o/ponyo-sur-la-falaise/xl/49a2b5c2f198e.jpg'
WHERE id = 20;

UPDATE friendships
SET accepted = 'true'
WHERE id = 4;



-- DROP TABLE IF EXISTS cute_animals;
CREATE TABLE cute_animals (
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL,
    animal VARCHAR(255) NOT NULL,
    score INT NOT NULL

);

INSERT INTO cute_animals (animal,score) VALUES ('honey badger', 10);
INSERT INTO cute_animals (animal,score) VALUES ('hannibal', 10);
INSERT INTO cute_animals (animal,score) VALUES ('turtle', 15);

psql cute_animals -f petition -f /config/user.sql
