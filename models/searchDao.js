const appDataSource = require("./appDataSource");

const getSearchResults = async (queryParams) => {
  return await appDataSource.query(
    `SELECT 
  p.name,
  p.price,
  p.thumbnail_image
  from products p
  where p.name LIKE "%${queryParams}%"`
  );
};

module.exports = { getSearchResults };
