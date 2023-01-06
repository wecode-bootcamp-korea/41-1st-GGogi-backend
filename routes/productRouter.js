const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/products", productController.getProducts);
router.get("/productinfo/:productId", productController.getProductInfo);
module.exports = { router };
