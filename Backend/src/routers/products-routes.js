const router = require("express").Router();
const {
  getProducts,
  createProduct,
  deleteProduct,
  updateProductQuantity,
} = require("../controllers/products");

router.get("/products", getProducts);
router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);
router.patch("/products/:id", updateProductQuantity);

module.exports = router;
