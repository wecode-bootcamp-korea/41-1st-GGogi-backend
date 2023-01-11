const appDataSource = require("./appDataSource");

const getSearchResults = async (keyword) => {
  return appDataSource.query(
    `SELECT 
  p.name,
  p.price,
  p.thumbnail_image
  from products p
  where p.name LIKE "%${keyword}%"`
  );
};

module.exports = { getSearchResults };
