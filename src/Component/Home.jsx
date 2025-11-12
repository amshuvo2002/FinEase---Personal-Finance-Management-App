import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../Provider/Authprovider";
import pic1 from "../assets/alexander-grey--8a5eJ1-mmQ-unsplash.jpg";
import pic2 from "../assets/alexander-grey-8lnbXtxFGZw-unsplash.jpg";
import pic3 from "../assets/alexander-mils-lCPhGxs7pww-unsplash.jpg";
import pic4 from "../assets/micheile-henderson-SoT4-mZhyhE-unsplash.jpg";
import pic5 from "../assets/micheile-henderson-ZVprbBmT8QA-unsplash.jpg";


const Home = () => {
  const { user } = useContext(Authcontext);

  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: pic1,
      title: "Achieve Your Financial Freedom 💰",
      subtitle:
        "Manage your money smartly and build your future with confidence.",
    },
    {
      image: pic2,
      title: "Plan, Save, and Grow 📈",
      subtitle: "Track income & expenses, and make every penny count.",
    },
    {
      image: pic3,
      title: "Invest in Your Dreams 🌟",
      subtitle: "Start small today and build a better tomorrow.",
    },
    {
      image: pic1,
      title: "Your Money, Your Control 💼",
      subtitle: "Stay in charge of your financial journey with smart planning.",
    },
    {
      image: pic2,
      title: "Budget Smarter, Live Better 🧮",
      subtitle: "Simple budgeting can change your financial life.",
    },
    {
      image: pic3,
      title: "Financial Freedom Starts Today 🚀",
      subtitle: "Begin your journey to financial success now.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
      if (t.type === "Income") totalIncome += Number(t.amount);
      else if (t.type === "Expense") totalExpense += Number(t.amount);
    });

    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen p-5 bg-gray-300">
      <section className="relative border-2 border-gray-300 text-center overflow-hidden shadow-2xl">
        <div className="relative w-full h-[65vh]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center">
                <h1 className="md:text-5xl text-3xl font-bold mb-4 text-white drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl px-4 text-gray-100 drop-shadow">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-5 w-full flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white scale-125" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl  p-3 shadow-xl bg-white font-bold text-gray-800 mb-8 text-center">
          Overview 🔎
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-gray-400 p-6 shadow-xl text-center hover:shadow-md transition">
            <h3 className="text-gray-600 mb-2">Total Balance 💵</h3>
            <p className="text-2xl text-black font-bold">${balance}</p>
          </div>
          <div className="bg-white border-2 border-gray-400 p-6 shadow-xl text-center hover:shadow-md transition">
            <h3 className="text-gray-600 mb-2">Income 📈</h3>
            <p className="text-2xl font-bold text-green-600">${income}</p>
          </div>
          <div className="bg-white border-2 border-gray-400 p-6 shadow-xl text-center hover:shadow-md transition">
            <h3 className="text-gray-600 mb-2">Expense 📉</h3>
            <p className="text-2xl font-bold text-red-500">${expense}</p>
          </div>
        </div>
      </section>

     
      <section className="bg-white py-16 border-4 border-gray-400 px-4 mt-8 shadow-md">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10">
      
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
              Budgeting Tips 📝
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 text-lg">
              <li>Track your spending regularly.</li>
              <li>Create a monthly budget and stick to it.</li>
              <li>Save at least 20% of your income.</li>
              <li>Avoid unnecessary debts.</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <img
              className="w-[350px] md:w-[400px]  shadow-md"
              src={pic4}
              alt="Budgeting Tips"
            />
          </div>
        </div>
      </section>

     
      <section className="bg-white border-4 border-gray-400 py-16 px-4 mt-8 shadow-md">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10">
         
          <div className="flex justify-center order-2 md:order-1">
            <img
              className="w-[350px] md:w-[400px] shadow-md"
              src={pic5}
              alt="Financial Planning"
            />
          </div>

        
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
              Why Financial Planning Matters? 🤔
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed text-center md:text-left">
              Financial planning helps you achieve your life goals, reduces
              stress, ensures better decision-making, and prepares you for
              unexpected events. Start planning today to secure a better
              tomorrow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
