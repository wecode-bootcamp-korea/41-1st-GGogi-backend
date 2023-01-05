-- migrate:up
CREATE TABLE carts (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NULL,
    product_id INT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_cart_products
        FOREIGN KEY (product_id)
        REFERENCES products(id),
    CONSTRAINT fk_carts_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

-- migrate:down
DROP TABLE IF EXISTS carts;
