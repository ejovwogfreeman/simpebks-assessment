const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const importCsvToMongo = require("./csv/csvUpload");
const OrderItem = require("./models/orderItemsModel");
const Product = require("./models/productsModel");
const Seller = require("./models/sellersModel");
const orderItemsRoutes = require("./routes/orderItemsRoutes");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/order_items", orderItemsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);

// upload csv
app.post("/api/upload_csv", async (req, res) => {
  try {
    await importCsvToMongo(OrderItem, "./csv/olist_order_items_dataset.csv");
    await importCsvToMongo(Product, "./csv/olist_products_dataset.csv");
    await importCsvToMongo(Seller, "./csv/olist_sellers_dataset.csv");
    res.status(200).send("CSV uploaded successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
