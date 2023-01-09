const appDataSource = require("./appDataSource");

const getProducts = async () => {
  return appDataSource.query(
    `SELECT
    id,
      name,
      price,
      thumbnail_image
      FROM products`
  );
};

const getProductInfo = async (productId) => {
  const [result] = await appDataSource.query(
    `SELECT
      p.name,
      p.date,
      p.price,
      p.description,
      p.thumbnail_image,
      pi.image_url
      FROM products p 
      join product_images pi on p.id = pi.product_id
      where p.id = ?`,
    [productId]
  );
  return result;
};

const getProductsByTagId = async (tagId) => {
  return appDataSource.query(
    `SELECT
    p.part_tag_id,
    JSON_ARRAYAGG(
      JSON_OBJECT(
    "productName", p.name,
    "price", p.price,
    "thumbnail", p.thumbnail_image,)
    ) as productInfo
    FROM products p
    where part_tag_id = ?`,
    [tagId]
  );
};

module.exports = { getProducts, getProductInfo, getProductsByTagId };
