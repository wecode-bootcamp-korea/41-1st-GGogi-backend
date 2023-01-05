-- migrate:up
CREATE TABLE part_tags (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE IF EXISTS part_tags;
