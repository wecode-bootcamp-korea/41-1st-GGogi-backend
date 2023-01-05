-- migrate:up
CREATE TABLE weights (
    id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE IF EXISTS weights;
