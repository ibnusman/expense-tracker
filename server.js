const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
