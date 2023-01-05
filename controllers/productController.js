const productService = require("../services/productService");

//전체리스트 필요정보 요청
const getProducts = async (req, res) => {
  try {
    const result = await productService.productShow(req);
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getProductInfo = async (req, res) => {
  try {
    const result = await productService.productInfoShow(req);
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
module.exports = { getProducts, getProductInfo };
