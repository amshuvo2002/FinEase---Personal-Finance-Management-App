import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Authcontext } from "../Provider/Authprovider";
import PrivateRoute from "../PrivetRoute/PrivateRoute";
import Swal from "sweetalert2";

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(Authcontext);

  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch existing transaction
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`http://localhost:3000/transactions/${id}`);
        const data = await res.json();
        setType(data.type);
        setCategory(data.category);
        setAmount(data.amount);
        setDescription(data.description || "");
        setDate(data.date.split("T")[0]); // format for input type="date"
      } catch (error) {
        console.error("Error fetching transaction:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]);

  // ✅ Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!category || !amount || !date) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const updatedTransaction = {
      type,
      category,
      amount: parseFloat(amount),
      description,
      date,
      userEmail: user.email,
      userName: user.displayName,
    };

    try {
      const res = await fetch(`http://localhost:3000/transactions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTransaction),
      });

      const data = await res.json();

      if (data.modifiedCount > 0 || data.matchedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Transaction Updated",
          text: "Your transaction has been updated successfully!",
        });
        navigate(`/My-Transaction`); // redirect to details page
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes made",
          text: "You didn't change any value",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  if (loading) {
    return (
      <PrivateRoute>
        <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
          Loading transaction...
        </div>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen p-6 bg-gray-300 flex justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
          <h2 className="text-4xl font-bold text-gray-500 mb-6 text-center">
            Update Transaction ✏️
          </h2>

          <form className="space-y-4" onSubmit={handleUpdate}>
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

            <button
              type="submit"
              className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
            >
              Update Transaction
            </button>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default UpdateTransaction;
