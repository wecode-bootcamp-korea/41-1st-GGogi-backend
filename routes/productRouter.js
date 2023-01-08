const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/products", productController.getProducts);
router.get("/productinfo/:productId", productController.getProductInfo);
router.get("/product/tag/:tagId", productController.getProductTag);
module.exports = { router };
