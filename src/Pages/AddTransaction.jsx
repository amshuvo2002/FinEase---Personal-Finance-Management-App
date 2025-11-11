import React, { useContext, useState } from "react";
import { Authcontext } from "../Provider/Authprovider";
import PrivateRoute from "../PrivetRoute/PrivateRoute";
import Swal from "sweetalert2";

const AddTransaction = () => {
  const { user } = useContext(Authcontext);

  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !amount || !date) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const transactionData = {
      type,
      category,
      amount: parseFloat(amount),
      description,
      date,
      userEmail: user.email,
      userName: user.displayName,
    };

    try {
      const response = await fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Transaction Added",
          text: "Your transaction has been saved successfully!",
        });
        // Clear form
        setCategory("");
        setAmount("");
        setDescription("");
        setDate("");
        setType("Income");
      } else {
        throw new Error("Failed to save transaction");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
           <title>FinEase-Add Transaction</title>
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
          <h2 className="text-4xl font-bold text-gray-500 text-center mb-6">
            Add Transaction 💰
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Type */}
            <div>
              <label className="block font-semibold mb-1">Type</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Salary, Food, Rent"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block font-semibold mb-1">Amount</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional"
              ></textarea>
            </div>

            {/* Date */}
            <div>
              <label className="block font-semibold mb-1">Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* User Email (Read-only) */}
            <div>
              <label className="block font-semibold mb-1">User Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                value={user?.email}
                disabled
              />
            </div>

            {/* User Name (Read-only) */}
            <div>
              <label className="block font-semibold mb-1">User Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                value={user?.displayName}
                disabled
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-700"
            >
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AddTransaction;
