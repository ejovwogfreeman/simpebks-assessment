const express = require("express");
const { updateAccount } = require("../controllers/accountController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/", authMiddleware, updateAccount);

module.exports = router;
