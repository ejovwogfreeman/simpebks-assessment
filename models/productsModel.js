const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: { type: String },
  product_category_name: { type: String },
  product_name_length: { type: Number },
  product_description_length: { type: Number },
  product_photos_qty: { type: Number },
  product_weight_g: { type: Number },
  product_length_cm: { type: Number },
  product_height_cm: { type: Number },
  product_width_cm: { type: Number },
});

module.exports = mongoose.model("Product", productSchema);
