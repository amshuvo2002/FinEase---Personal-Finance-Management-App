import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../Provider/Authprovider";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loader from "../Component/Loader"; // Loader import

const MyTransactions = () => {
  const { user } = useContext(Authcontext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const navigate = useNavigate();

  // ✅ Fetch Transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true); // start loader
      const res = await fetch(
        `https://surver-part.vercel.app/transactions?email=${user.email}`
      );
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false); // hide loader
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchTransactions();
    }
  }, [user]);

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
          const res = await fetch(
            `https://surver-part.vercel.app/transactions/${id}`,
            {
              method: "DELETE",
            }
          );

          const data = await res.json();

          if (data.deletedCount > 0) {
            setTransactions((prev) => prev.filter((t) => t._id !== id));
            Swal.fire("Deleted!", "Transaction has been deleted.", "success");
          } else {
            Swal.fire("Error!", "Delete failed.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete transaction.", "error");
        }
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/update-transaction/${id}`);
  };

  const handleView = (id) => {
    navigate(`/transaction-details/${id}`);
  };

  if (loading) return <Loader />; // show loader until data is loaded

  return (
    <div className="min-h-screen p-6 bg-gray-300">
      <title>FinEase-My Transaction</title>
      <h2 className="text-4xl font-bold text-gray-500 mb-6 text-center">
        My Transactions 📝
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full  text-black bg-white shadow-lg">
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
                <td colSpan="5" className="text-center py-4">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t._id} className="border-b">
                  <td className="py-2 px-4 text-center">{t.type}</td>
                  <td className="py-2 px-4 text-center">{t.category}</td>
                  <td className="py-2 px-4 text-center">${t.amount}</td>
                  <td className="py-2 px-4 text-center">
                    {new Date(t.date).toLocaleDateString()}
                  </td>

                  <td className="py-2 px-4 flex justify-center gap-2">
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
  );
};

export default MyTransactions;
