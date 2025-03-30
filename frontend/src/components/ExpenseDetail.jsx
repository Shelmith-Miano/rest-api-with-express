import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ExpenseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [expense, setExpense] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedExpense, setUpdatedExpense] = useState({});
    const [error, setError] = useState(null); // Add error state for better feedback

    useEffect(() => {
        if (!id) return;

        console.log("Fetching expense for ID:", id);
        fetch(`http://localhost:4000/api/expenses/${id}`)
            .then((res) => {
                console.log("Response status:", res.status, "OK:", res.ok);
                if (!res.ok) throw new Error(`Failed to fetch expense: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                console.log("Fetched data:", data);
                setExpense(data);
                setUpdatedExpense(data);
            })
            .catch((err) => {
                console.error("Error fetching expense:", err.message);
                setError(err.message); // Set error state
            });
    }, [id]);

    const handleInputChange = (e) => {
        setUpdatedExpense({ ...updatedExpense, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        fetch(`http://localhost:4000/api/expenses/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedExpense),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to update expense");
                return res.json();
            })
            .then((data) => {
                setExpense(data);
                setIsEditing(false);
            })
            .catch((err) => console.error("Error updating expense:", err));
    };

    const handleDelete = () => {
        fetch(`http://localhost:4000/api/expenses/${id}`, { method: "DELETE" })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to delete expense");
                navigate("/");
            })
            .catch((err) => console.error("Error deleting expense:", err));
    };

    if (error) return <p className="text-center text-red-500">{error}</p>; // Show error if fetch fails
    if (!expense) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Expense Details</h2>
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
                {isEditing ? (
                    <div className="space-y-4">
                        <input
                            type="number"
                            name="amount"
                            value={updatedExpense.amount || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="description"
                            value={updatedExpense.description || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="category"
                            value={updatedExpense.category || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="date"
                            name="date"
                            value={updatedExpense.date || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex space-x-2">
                            <button
                                onClick={handleUpdate}
                                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <p><strong>ID:</strong> {expense.id}</p>
                        <p><strong>Amount:</strong> ${expense.amount}</p>
                        <p><strong>Description:</strong> {expense.description}</p>
                        <p><strong>Category:</strong> {expense.category}</p>
                        <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
                        <div className="flex space-x-2 mt-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <button
                onClick={() => navigate("/")}
                className="mt-4 text-blue-600 hover:underline"
            >
                Back to List
            </button>
        </div>
    );
}

export default ExpenseDetail;