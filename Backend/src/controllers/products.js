const Inventory = require("../models/products");

const slugify = (text) => {
  return text
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .normalize("NFD") // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

const getProducts = async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const createProduct = async (req, res) => {
  const payload = req.body;
  payload.slug = slugify(payload.category);

  try {
    const item = await Inventory.create(payload);
    res.status(200).json({ message: "success", item });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const updateProductQuantity = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedItem = await Inventory.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Inventory.findOneAndDelete({ _id: id });
    if (!item) {
      res.status(401).send("something went wrong");
    }
    res.status(200).json({ message: "success", item });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProductQuantity,
};
