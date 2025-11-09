import React, { } from "react";

const Home = () => {
  

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Banner Section */}
      <section className="bg-cyan-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Achieve Your Financial Freedom 💰</h1>
        <p className="text-xl">Take control of your money and secure your future</p>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-700 mb-8 text-center">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-gray-500 mb-2">Total Balance</h3>
            <p className="text-2xl font-bold">${}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-gray-500 mb-2">Income</h3>
            <p className="text-2xl font-bold text-green-500">${}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-gray-500 mb-2">Expense</h3>
            <p className="text-2xl font-bold text-red-500">${}</p>
          </div>
        </div>
      </section>

      {/* Static Section 1: Budgeting Tips */}
      <section className="bg-white py-16 px-4 mt-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Budgeting Tips</h2>
        <ul className="max-w-3xl mx-auto list-disc list-inside text-gray-600 space-y-2">
          <li>Track your spending regularly.</li>
          <li>Create a monthly budget and stick to it.</li>
          <li>Save at least 20% of your income.</li>
          <li>Avoid unnecessary debts.</li>
        </ul>
      </section>

      {/* Static Section 2: Why Financial Planning Matters */}
      <section className="bg-gray-50 py-16 px-4 mt-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Why Financial Planning Matters
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-center">
          Financial planning helps you achieve your life goals, reduces stress, ensures better
          decision-making, and prepares you for unexpected events. Start planning today to secure a
          better tomorrow.
        </p>
      </section>
    </div>
  );
};

export default Home;
