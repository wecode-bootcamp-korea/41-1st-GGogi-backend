const searchService = require("../services/searchService");
const { catchAsync } = require("../utils/error");

const getSearchResults = catchAsync(async (req, res) => {
  const { keyword } = req.query;
  const getSearchResults = await searchService.getSearchResults(keyword);
  return res.status(200).json(getSearchResults);
});

module.exports = { getSearchResults };
