import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../Provider/Authprovider";

const Home = () => {
  const { user } = useContext(Authcontext);

  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  
  const fetchData = async () => {
    if (!user?.email) return;

    const res = await fetch(
      `https://surver-part.vercel.app/transactions?email=${user.email}`
    );
    const data = await res.json();
    setTransactions(data);

    calculateAmounts(data);
  };

  
  const calculateAmounts = (data) => {
    let totalIncome = 0;
    let totalExpense = 0;

    data.forEach((t) => {
      if (t.type === "Income") {
        totalIncome += Number(t.amount);
      } else if (t.type === "Expense") {
        totalExpense += Number(t.amount);
      }
    });

    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen p-5 bg-gray-200 ">
      <section className="bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500  border-2 border-gray-700 text-white py-20 text-center">
        <h1 className="md:text-5xl text-gray-800 text-3xl font-bold mb-4">
          Achieve Your Financial Freedom 💰
        </h1>
        <p className="text-xl text-gray-100 px-4">
          Take control of your money and secure your future
        </p>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Overview🔎
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-gray-800 p-6 shadow text-center">
            <h3 className="text-gray-700 mb-2">Total Balance💵</h3>
            <p className="text-2xl text-black font-bold">${balance}</p>
          </div>
          <div className="bg-white border-2 border-gray-700 p-6  shadow text-center">
            <h3 className="text-gray-700 mb-2">Income📈</h3>
            <p className="text-2xl font-bold text-green-500">${income}</p>
          </div>
          <div className="bg-white border-2 border-gray-600 p-6 shadow text-center">
            <h3 className="text-gray-700 mb-2">Expense📉</h3>
            <p className="text-2xl font-bold text-red-500">${expense}</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400  py-16 border-2 border-gray-800 px-4 mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Budgeting Tips📝
        </h2>
        <ul className="max-w-3xl mx-auto list-disc list-inside text-gray-600 space-y-2">
          <li>Track your spending regularly.</li>
          <li>Create a monthly budget and stick to it.</li>
          <li>Save at least 20% of your income.</li>
          <li>Avoid unnecessary debts.</li>
        </ul>
      </section>

      <section className="bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 border-2 border-gray-800 py-16 px-4 mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Why Financial Planning Matters ?🤔
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-center">
          Financial planning helps you achieve your life goals, reduces stress,
          ensures better decision-making, and prepares you for unexpected
          events. Start planning today to secure a better tomorrow.
        </p>
      </section>
    </div>
  );
};

export default Home;
