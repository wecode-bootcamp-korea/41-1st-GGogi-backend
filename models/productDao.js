const appDataSource = require("./appDataSource");

const getProducts = async () => {
  const result = await appDataSource.query(
    `SELECT
    id,
      name,
      price,
      thumbnail_image
      FROM products`
  );
  return result;
};

const getProductInfo = async (productId) => {
  const result = await appDataSource.query(
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
  return result;
};

const getProductsByTagId = async (tagId) => {
  return await appDataSource.query(
    `SELECT
    part_tag_id,
    JSON_ARRAYAGG(
      JSON_OBJECT(
    "productName", name,
    "price", price,
    "thumbnail", thumbnail_image,)
    ) as productInfo
    FROM products
    where part_tag_id = ?`,
    [tagId]
  );
};
module.exports = { getProducts, getProductInfo, getProductsByTagId };
