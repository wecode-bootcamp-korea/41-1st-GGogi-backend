-- migrate:up
CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    order_num VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    order_status_id INT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT fk_orders_order_status
        FOREIGN KEY (order_status_id)
        REFERENCES order_status(id)
);

-- migrate:down
DROP TABLE IF EXISTS orders;
