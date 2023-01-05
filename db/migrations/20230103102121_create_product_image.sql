-- migrate:up
CREATE TABLE product_images (
    id INT AUTO_INCREMENT,
    image_url VARCHAR(1000) NOT NULL,
    product_id INT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_product_images_products
        FOREIGN KEY (product_id)
        REFERENCES products(id)
);

-- migrate:down
DROP TABLE IF EXISTS product_images;
