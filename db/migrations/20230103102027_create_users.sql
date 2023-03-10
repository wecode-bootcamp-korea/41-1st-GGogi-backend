-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    address VARCHAR(1000) NOT NULL,
    phone VARCHAR(100) NULL,
    point DECIMAL(10,2) NULL DEFAULT 100000.0,
    email VARCHAR(200) UNIQUE NOT NULL,
    birthdate DATETIME NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE IF EXISTS users;
