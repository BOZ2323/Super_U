

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




UPDATE super_users
SET image_url = 'http://img.filmsactu.net/datas/films/p/o/ponyo-sur-la-falaise/xl/49a2b5c2f198e.jpg'
WHERE id = 20;


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
