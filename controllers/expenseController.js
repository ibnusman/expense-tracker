const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
  try {
    const { category, minAmount, maxAmount, sortBy, search } = req.query;

    let filter = { user: req.userId };

    if (category) filter.category = category;
    if (minAmount) filter.amount = { ...filter.amount, $gte: parseFloat(minAmount) };
    if (maxAmount) filter.amount = { ...filter.amount, $lte: parseFloat(maxAmount) };
    if (search) filter.description = { $regex: search, $options: "i" };

    let sortOption = {};
    if (sortBy) sortOption[sortBy] = 1; // Sort ascending by default

    const expenses = await Expense.find(filter).sort(sortOption);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const receiptUrl = req.file ? `/uploads/${req.file.filename}` : null; // Save file path

    const expense = new Expense({
      description,
      amount,
      category,
      user: req.userId,
      receipt: receiptUrl,
    });

    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (req.body.description) expense.description = req.body.description;
    if (req.body.amount) expense.amount = req.body.amount;
    if (req.body.category) expense.category = req.body.category;
    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
