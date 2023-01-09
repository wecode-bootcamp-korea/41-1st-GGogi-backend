const appDataSource = require("./appDataSource");

const getProducts = async (req) => {
  return await appDataSource.query(
    `SELECT
      name,
      price,
      thumbnail_image
      FROM products`
  );
};

const getProductInfo = async (productId) => {
  return await appDataSource.query(
    `SELECT
      name,
      date,
      price,
      description,
      thumbnail_image,
      product_images.image_url
      FROM products
      join product_images on products.id = product_images.product_id
      where product_id = ?`,
    [productId]
  );
};

const getProductTag = async (tagId) => {
  return await appDataSource.query(
    `SELECT
    name,
    price,
    thumbnail_image,
    part_tag_id
    FROM products
    where part_tag_id = ?`,
    [tagId]
  );
};
module.exports = { getProducts, getProductInfo, getProductTag };
