const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  order_item_id: { type: String, required: true },
  product_id: { type: String, required: true },
  seller_id: { type: String, required: true },
  shipping_limit_date: { type: Date, required: true },
  price: { type: Number, required: true },
  freight_value: { type: Number, required: true },
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
