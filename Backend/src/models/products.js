const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  category: String,
  slug: String,
  name: String,
  quantity: Number,
  expiryDate: Date,
  location: String,
  notes: String,
});

module.exports = mongoose.model("products", productsSchema);
