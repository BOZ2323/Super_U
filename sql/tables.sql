

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
