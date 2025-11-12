import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";


const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://surver-part.vercel.app/transactions/${id}`);
        const data = await res.json();
        setTransaction(data);
      } catch (error) {
        console.error("Error loading details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      
        <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
          Loading details...
        </div>
      
    );
  }

  if (!transaction) {
    return (
     
        <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
          No transaction found!
        </div>
     
    );
  }

  return (
   
      <div className="min-h-screen p-6 bg-gray-200 flex justify-center">
           <title>FinEase-Transaction Details</title>
        <div className="bg-white p-8 rounded-xl shadow-lg w-2/3 mx-auto">
          <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
            Transaction Details
          </h2>

          <div className="space-y-4">
            <p className="text-lg">
              <strong className="text-gray-500">Type:</strong> {transaction.type}
            </p>

            <p className="text-lg">
              <strong className="text-gray-500">Category:</strong> {transaction.category}
            </p>

            <p className="text-lg">
              <strong className="text-gray-500">Amount:</strong> ${transaction.amount}
            </p>

            <p className="text-lg">
              <strong className="text-gray-500">Description:</strong> {transaction.description || "N/A"}
            </p>

            <p className="text-lg">
              <strong className="text-gray-500">Date:</strong>{" "}
              {new Date(transaction.date).toLocaleDateString()}
            </p>

            {transaction.note && (
              <p className="text-lg">
                <strong className="text-gray-500">Note:</strong> {transaction.note}
              </p>
            )}

            <p className="text-lg">
              <strong className="text-gray-500">User Email:</strong> {transaction.userEmail}
            </p>
          </div>

        
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default DetailsPage;
