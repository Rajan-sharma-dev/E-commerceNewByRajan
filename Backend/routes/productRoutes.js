const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct,getSingleProduct } = require("../controller/productController");
const { isAuthenticatedUser } = require("../Middleware/auth");

const router = express.Router();
router.route("/products").get(isAuthenticatedUser,getAllProducts);
router.route("/products/new").post(createProduct);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProduct);
router.route("/products/:id").get(getSingleProduct);

module.exports = router;