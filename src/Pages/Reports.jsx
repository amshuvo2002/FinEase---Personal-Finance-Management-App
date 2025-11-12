import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../Provider/Authprovider";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Reports = () => {
  const { user } = useContext(Authcontext);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [monthFilter, setMonthFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(
          `https://surver-part.vercel.app/transactions?email=${user.email}`
        );
        const data = await res.json();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    if (user?.email) fetchTransactions();
  }, [user]);

  useEffect(() => {
    let filtered = [...transactions];

    if (monthFilter) {
      filtered = filtered.filter(
        (t) => new Date(t.date).getMonth() + 1 === Number(monthFilter)
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    setFilteredTransactions(filtered);
  }, [monthFilter, categoryFilter, transactions]);

  const pieData = filteredTransactions.reduce((acc, t) => {
    const found = acc.find((x) => x.name === t.category);
    if (found) {
      found.value += t.amount;
    } else {
      acc.push({ name: t.category, value: t.amount });
    }
    return acc;
  }, []);

  const barData = Array.from({ length: 12 }, (_, i) => {
    const total = filteredTransactions
      .filter((t) => new Date(t.date).getMonth() === i)
      .reduce((sum, t) => sum + t.amount, 0);

    return { month: i + 1, total };
  });

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A569BD",
    "#FF6384",
  ];

  return (
   
      <div className="min-h-screen p-6 text-black bg-gray-300">
        <title>FinEase - Reports</title>
        <h2 className="text-4xl font-bold text-gray-500 mb-6 text-center">
          Reports 📊
        </h2>

        <div className="flex gap-4 mb-6 justify-center">

          <select
            className="p-2 "
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="">All Months</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                Month {i + 1}
              </option>
            ))}
          </select>

      
          <select
            className="p-2 rounded-lg"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {[...new Set(transactions.map((t) => t.category))].map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

   
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
   
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-center">
              Category-wise Spending
            </h3>

            <PieChart width={350} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-center">
              Monthly Totals
            </h3>

            <BarChart className="" width={400} height={300} data={barData}>
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
   
  );
};

export default Reports;
