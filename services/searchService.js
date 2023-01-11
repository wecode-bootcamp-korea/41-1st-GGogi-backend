const searchDao = require("../models/searchDao");

const getSearchResults = async (queryParams) => {
  console.log(queryParams);
  return searchDao.getSearchResults(queryParams);
};
module.exports = { getSearchResults };
