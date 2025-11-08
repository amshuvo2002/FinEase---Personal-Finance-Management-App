import React from 'react';
import { Link } from "react-router";

const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-sm p-6 rounded-lg shadow-lg border">
                
                <h2 className="text-2xl font-bold text-center mb-6">
                    Create an Account
                </h2>

                <form className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            className="border w-full p-2 rounded"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            className="border w-full p-2 rounded"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Photo URL</label>
                        <input
                            type="text"
                            className="border w-full p-2 rounded"
                            placeholder="Your profile photo link"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            className="border w-full p-2 rounded"
                            placeholder="Create a password"
                        />
                    </div>

                    <button className="w-full bg-blue-500 text-white p-2 rounded font-medium">
                        Register
                    </button>
                </form>

                {/* Login Page Link */}
                <p className="text-center mt-4">
                    Already have an account? 
                    <Link to="/login" className="text-blue-600 font-medium ml-1">
                        Login
                    </Link>
                </p>

                {/* Google Login Button */}
                  <button className="btn w-full mt-5 bg-white text-black border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
            </div>
        </div>
    );
};

export default Register;
