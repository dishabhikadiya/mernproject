const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductdetails,
} = require("../controller/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(isAuthenticatedUser,getAllProducts);
// router.route("/products").get(isAuthenticatedUser,authorizeRoles("admin"));
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route("/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
router.route("/getproduct/:id").get(getProductdetails);
router.route("/productdelete/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
module.exports = router;