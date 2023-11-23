const sellersCollection = require("../models/sellersModel");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).send("Unauthorized");
  }

  const encodedCredentials = authHeader.split(" ")[1];

  const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString(
    "utf-8"
  );

  const [sellerId, sellerZipCodePrefix] = decodedCredentials.split(":");

  const seller = await sellersCollection.findOne({
    seller_id: sellerId,
    seller_zip_code_prefix: sellerZipCodePrefix,
  });

  if (!seller) {
    return res.status(401).send("Unauthorized");
  }

  req.auth = { user: sellerId };

  next();
};

module.exports = authMiddleware;
