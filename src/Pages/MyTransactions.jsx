import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../Provider/Authprovider";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loader from "../Component/Loader"; 

const MyTransactions = () => {
  const { user } = useContext(Authcontext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("date"); 
  const [sortOrder, setSortOrder] = useState("desc"); 
  const navigate = useNavigate();

  
  const fetchTransactions = async () => {
    try {
      setLoading(true); 
      const res = await fetch(
        `https://surver-part.vercel.app/transactions?email=${user.email}`
      );
      const data = await res.json();

    
      const sortedData = data.sort((a, b) => {
        if (sortField === "amount") {
          return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
        } else if (sortField === "date") {
          return sortOrder === "asc"
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        }
        return 0;
      });

      setTransactions(sortedData);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchTransactions();
    }
  }, [user, sortField, sortOrder]);

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

 
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  if (loading) return <Loader />; 

  return (
    <div className="min-h-screen p-6 ">
      <title>FinEase-My Transaction</title>
      <h2 className="text-4xl font-bold text-gray-400 mb-6 text-center">
        My Transactions 📝
      </h2>

    
      <div className="flex gap-2 mb-4">
        <button
          className="btn bg-gray-100 border-2 border-gray-400 text-gray-800 px-3 py-1"
          onClick={() => handleSort("date")}
        >
          Sort by Date {sortField === "date" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>
        <button
          className="btn bg-gray-100 border-2 border-gray-400 text-gray-800 px-3 py-1"
          onClick={() => handleSort("amount")}
        >
          Sort by Amount {sortField === "amount" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-2 border-gray-400  text-black bg-white shadow-lg">
          <thead className="bg-gray-200 border-2 border-gray-400 ">
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
