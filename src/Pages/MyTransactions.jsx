import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../Provider/Authprovider";
import PrivateRoute from "../PrivetRoute/PrivateRoute";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyTransactions = () => {
  const { user } = useContext(Authcontext);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  // Fetch transactions for logged-in user
  const fetchTransactions = async () => {
    try {
      const res = await fetch(`http://localhost:5000/transactions?email=${user.email}`);
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchTransactions();
    }
  }, [user]);

  // Delete transaction
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/transactions/${id}`, { method: "DELETE" });
          if (res.ok) {
            setTransactions(transactions.filter((t) => t._id !== id));
            Swal.fire("Deleted!", "Transaction has been deleted.", "success");
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete transaction.", "error");
        }
      }
    });
  };

  // Update transaction → redirect to Update page
  const handleUpdate = (id) => {
    navigate(`/update-transaction/${id}`);
  };

  // View details
  const handleView = (id) => {
    navigate(`/transaction-details/${id}`);
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen p-6 bg-gray-300">
        <h2 className="text-4xl font-bold text-gray-500 mb-6 text-center">My Transactions 📝</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">No transactions found.</td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t._id} className="border-b">
                    <td className="py-2 px-4">{t.type}</td>
                    <td className="py-2 px-4">{t.category}</td>
                    <td className="py-2 px-4">${t.amount}</td>
                    <td className="py-2 px-4">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        onClick={() => handleUpdate(t._id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-2 rounded-lg"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleView(t._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-lg"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default MyTransactions;
