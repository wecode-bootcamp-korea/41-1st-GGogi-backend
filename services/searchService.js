const searchDao = require("../models/searchDao");

const getSearchResults = async (keyword) => {
  return searchDao.getSearchResults(keyword);
};
module.exports = { getSearchResults };
