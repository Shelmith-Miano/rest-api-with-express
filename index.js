const express = require("express");
const app = express();
const port = 4000;

app.use(express.json()); // Middleware to parse JSON

// Fixed expenses array with unique IDs
const expenses = [
    { id: 1, amount: 15000, description: "rent", category: "needs", date: "2025-03-29" },
    { id: 2, amount: 15, description: "coffee", category: "wants", date: "2025-03-29" } // Changed ID and description for variety
];

const findExpenseById = (id) => expenses.find((exp) => exp.id === parseInt(id));

// GET all expenses
app.get("/api/expenses", (req, res) => {
    res.json(expenses);
});

// GET one expense by ID (Added this missing endpoint)
app.get("/api/expenses/:id", (req, res) => {
    const expense = findExpenseById(req.params.id);
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    res.json(expense);
});

// POST a new expense (Fixed this)
app.post("/api/expenses", (req, res) => {
    const { amount, description, category, date } = req.body; // Use req.body
    if (!amount || !description || !category || !date) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newExpense = {
        id: expenses.length + 1,
        amount: parseFloat(amount),
        description,
        category,
        date,
    };
    expenses.push(newExpense);
    res.status(201).json(newExpense);
});

// PUT (update) an expense by ID
app.put("/api/expenses/:id", (req, res) => {
    const expense = findExpenseById(req.params.id);
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    const { amount, description, category, date } = req.body;
    expense.amount = amount ? parseFloat(amount) : expense.amount;
    expense.description = description || expense.description;
    expense.category = category || expense.category;
    expense.date = date || expense.date;

    res.json(expense);
});

// DELETE an expense by ID
app.delete("/api/expenses/:id", (req, res) => {
    const index = expenses.findIndex((exp) => exp.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Expense not found" });
    expenses.splice(index, 1);
    res.status(204).send(); // No content on successful delete
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});