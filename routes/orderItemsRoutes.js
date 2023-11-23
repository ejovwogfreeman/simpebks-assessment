const express = require("express");
const {
  getAllOrderItems,
  deleteOrderItem,
} = require("../controllers/orderItemsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAllOrderItems);
router.delete("/:id", authMiddleware, deleteOrderItem);

module.exports = router;
