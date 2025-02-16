const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const path = require("path");


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;
app.use("/api/auth", authRoutes);
// Middleware
app.use(cors());
app.use(express.json());
// Serve static files (uploaded receipts)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));



// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
