const appDataSource = require("./appDataSource");

const getProducts = async (categoryId, sort, offset, limit) => {
  let whereClause = categoryId ? `WHERE category_id = ${categoryId}` : ``;

  const sortMethod = Object.freeze({
    cheap: "p.price ASC",
    expensive: "p.price DESC",
    new: "p.create_at DESC",
    old: "p.create_at ASC",
    nameASC: "p.name ASC",
    nameDESC: "p.name DESC",
  });

  const productList = await appDataSource.query(
    `SELECT SQL_CALC_FOUND_ROWS
    p.id,
      p.name,
      p.price,
      p.thumbnail_image,
      p.part_tag_id,
      p.weight_id,
      p.category_id
      FROM products p
      ${whereClause}
      ORDER BY ${sortMethod[sort]}
      LIMIT ${limit} OFFSET ${offset}`
  );
  return productList;
};

const getProductInfo = async (productId) => {
  const [result] = await appDataSource.query(
    `SELECT
      p.name,
      p.date,
      p.price,
      p.description,
      p.thumbnail_image,
      JSON_ARRAYAGG(
pi.image_url) as image_url
      FROM products p 
      left join product_images pi on p.id = pi.product_id
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
    "thumbnail", p.thumbnail_image)
    ) as productInfo
    FROM products p
    where p.part_tag_id = ?`,
    [tagId]
  );
};

module.exports = { getProducts, getProductInfo, getProductsByTagId };
