const Seller = require("../models/sellersModel");

const updateAccount = async (req, res) => {
  const { seller_city, seller_state } = req.body;
  const sellerId = req.auth.user;

  try {
    // Find the seller by sellerId
    const seller = await Seller.findOne({ seller_id: sellerId });

    // Check if the seller exists
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    // Update the seller's city and/or state
    if (seller_city) {
      seller.seller_city = seller_city;
    }

    if (seller_state) {
      seller.seller_state = seller_state;
    }

    // Save the changes
    await seller.save();

    // Return the updated seller's city and state as a response
    res.status(200).json({
      seller,
    });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { updateAccount };
