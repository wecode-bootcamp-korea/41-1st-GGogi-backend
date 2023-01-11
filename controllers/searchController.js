const searchService = require("../services/searchService");
const { catchAsync } = require("../utils/error");

const getSearchResults = catchAsync(async (req, res) => {
  const queryParams = req.query.keyword;
  const getSearchResults = await searchService.getSearchResults(queryParams);
  return res.status(200).json(getSearchResults);
});

module.exports = { getSearchResults };
