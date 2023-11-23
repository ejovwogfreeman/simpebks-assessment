const OrderItem = require("../models/orderItemsModel");

const getAllOrderItems = async (req, res) => {
  try {
    const sellerId = req.auth.user;

    // Find all order items for the given seller
    const orderItems = await OrderItem.find({ seller_id: sellerId });

    const response = {
      data: orderItems,
      total: orderItems.length,
      limit: 20, // Set your desired limit
      offset: 0,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const orderId = req.params.id;
    const sellerId = req.auth.user;

    const orderItem = await OrderItem.findOneAndDelete({
      order_id: orderId,
      seller_id: sellerId,
    });

    if (!orderItem) {
      return res.status(404).json({ error: "Order item not found" });
    }

    res.status(200).json({ message: "Order item deleted successfully" });
  } catch (error) {
    console.error("Error deleting order item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllOrderItems, deleteOrderItem };
