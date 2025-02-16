const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // Import upload middleware

router.get("/", authMiddleware, expenseController.getExpenses);
router.post("/", authMiddleware, upload.single("receipt"), expenseController.createExpense); // Accept receipts
router.put("/:id", authMiddleware, expenseController.updateExpense);
router.delete("/:id", authMiddleware, expenseController.deleteExpense);

module.exports = router;
