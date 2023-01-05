-- migrate:up
CREATE TABLE order_products (
    id INT NOT NULL AUTO_INCREMENT,
    orders_id INT NULL,
    product_id INT NULL,
    quantity INT NOT NULL,
    order_status_id INT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_order_products_products
        FOREIGN KEY (product_id)
        REFERENCES products(id),
    CONSTRAINT fk_order_products_orders
        FOREIGN KEY (orders_id)
        REFERENCES orders(id),
    CONSTRAINT fk_order_products_order_status
        FOREIGN KEY (order_status_id)
        REFERENCES order_status(id)
);

-- migrate:down
DROP TABLE IF EXISTS order_products;
