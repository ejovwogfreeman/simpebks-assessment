const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  seller_id: { type: String, required: true },
  seller_zip_code_prefix: { type: String, required: true },
  seller_city: { type: String, required: true },
  seller_state: { type: String, required: true },
});

module.exports = mongoose.model("Seller", sellerSchema);
