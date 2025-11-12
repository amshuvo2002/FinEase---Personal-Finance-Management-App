import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen border-2 flex flex-col items-center justify-center bg-gray-100 p-4">
      <title>FinEase-Error</title>

      <h1 className="text-9xl font-extrabold text-red-500 mb-4">404</h1>

      <h2 className="text-3xl font-bold text-gray-700 mb-2">
        Oops! Page Not Found👻
      </h2>

      <p className="text-gray-500 mb-6 text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link to="/">
        <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
