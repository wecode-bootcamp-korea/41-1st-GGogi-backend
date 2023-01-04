-- migrate:up
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    thumbnail_image VARCHAR(1000) NOT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    category_id INT NULL,
    part_tag_id INT NULL,
    weight_id INT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_products_part_tags
        FOREIGN KEY (part_tag_id)
        REFERENCES part_tags(id),
    CONSTRAINT fk_products_categories
        FOREIGN KEY (category_id)
        REFERENCES categories(id),
    CONSTRAINT fk_products_weights
        FOREIGN KEY (weight_id)
        REFERENCES weights(id)
);

-- migrate:down
DROP TABLE IF EXISTS products;
