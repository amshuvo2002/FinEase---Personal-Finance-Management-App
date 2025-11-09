import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../Provider/Authprovider";
import PrivateRoute from "../PrivetRoute/PrivateRoute";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const Reports = () => {
  const { user } = useContext(Authcontext);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [monthFilter, setMonthFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch transactions for logged-in user
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`http://localhost:5000/transactions?email=${user.email}`);
        const data = await res.json();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };
    if (user?.email) fetchTransactions();
  }, [user]);

  // Filter transactions
  useEffect(() => {
    let data = [...transactions];
    if (monthFilter) {
      data = data.filter(t => new Date(t.date).getMonth() + 1 === parseInt(monthFilter));
    }
    if (categoryFilter) {
      data = data.filter(t => t.category === categoryFilter);
    }
    setFilteredTransactions(data);
  }, [monthFilter, categoryFilter, transactions]);

  // Prepare Pie Chart data
  const pieData = filteredTransactions.reduce((acc, t) => {
    const found = acc.find(item => item.name === t.category);
    if (found) found.value += t.amount;
    else acc.push({ name: t.category, value: t.amount });
    return acc;
  }, []);

  // Prepare Bar Chart data (monthly totals)
  const barData = Array.from({ length: 12 }, (_, i) => {
    const monthTransactions = filteredTransactions.filter(t => new Date(t.date).getMonth() === i);
    const total = monthTransactions.reduce((sum, t) => sum + t.amount, 0);
    return { month: i + 1, total };
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#FF6384"];

  return (
    <PrivateRoute>
      <div className="min-h-screen p-6 bg-gray-300">
        <h2 className="text-4xl font-bold text-gray-500 mb-6 text-center">Reports 📊</h2>

        {/* Filters */}
        <div className="flex gap-4 mb-6 justify-center">
          <select
            className="p-2 rounded-lg"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="">All Months</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>{`Month ${i + 1}`}</option>
            ))}
          </select>

          <select
            className="p-2 rounded-lg"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {[...new Set(transactions.map(t => t.category))].map((c, idx) => (
              <option key={idx} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Charts */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-center">Category-wise Spending</h3>
            <PieChart width={300} height={300}>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-center">Monthly Totals</h3>
            <BarChart width={500} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Reports;
