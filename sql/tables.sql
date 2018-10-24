DROP TABLE IF EXISTS super_users;

CREATE TABLE super_users(
    id SERIAL PRIMARY KEY,
    comment VARCHAR (500),
    username VARCHAR (50),
    image_url VARCHAR (500),
    users_bio VARCHAR (2000),
    image_id INT NOT NULL REFERENCES images(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// ALTER TABLE users DROP UNIQUE image_id DROP INDEX;
