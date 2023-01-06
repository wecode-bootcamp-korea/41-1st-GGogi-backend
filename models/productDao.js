const appDataSource = require("./appDataSource");

const productAll = async (req) => {
  try {
    const result = await appDataSource.query(
      `SELECT
      name,
      price,
      thumbnail_image
      FROM products`
    );
    return result;
  } catch (err) {
    console.log(err);
    const error = new Error("No result");
    error.statusCode = 500;
    throw error;
  }
};

const getProductInfo = async (productId) => {
  try {
    return await appDataSource.query(
      `SELECT
      name,
      price,
      thumbnail_image,
      product_images.image_url
      FROM products
      join product_images on products.id = product_images.product_id
      where product_id = ?`,
      [productId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("No result");
    error.statusCode = 500;
    throw error;
  }
};
module.exports = { productAll, getProductInfo };
