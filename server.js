const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();
const PORT = process.env.PORT || 5002;

// ✅ Middleware (Place Before Routes)
app.use(cors());
app.use(express.json()); // ✅ Ensure req.body is parsed
app.use(express.urlencoded({ extended: true })); // ✅ Handles form data

// ✅ Serve static files (uploaded receipts)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
