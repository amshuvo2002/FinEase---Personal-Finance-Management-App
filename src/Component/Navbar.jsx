import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";
import { Authcontext } from "../Provider/Authprovider";
import Logo from "../assets/logo.jpg";
import { FiLogIn, FiLogOut, FiChevronDown } from "react-icons/fi";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, setuser } = useContext(Authcontext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setuser(null);
    setDropdownOpen(false);

    Swal.fire({
      title: "Logged Out!",
      text: "You have been logged out successfully.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="navbar bg-gradient-to-br text-black from-gray-300 to-gray-500 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 z-1 mt-3 w-52 p-2 shadow">
              <li><NavLink to="/" className={({ isActive }) => isActive ? "underline underline-offset-4 font-semibold" : ""}>Home</NavLink></li>
              <li><NavLink to="Add-Transaction" className={({ isActive }) => isActive ? "underline underline-offset-4 font-semibold" : ""}>Add Transaction</NavLink></li>
              <li><NavLink to="My-Transaction" className={({ isActive }) => isActive ? "underline underline-offset-4 font-semibold" : ""}>My Transactions</NavLink></li>
              <li><NavLink to="Reports" className={({ isActive }) => isActive ? "underline underline-offset-4 font-semibold" : ""}>Reports</NavLink></li>
              <li><NavLink to="My-Profile" className={({ isActive }) => isActive ? "underline underline-offset-4 font-semibold" : ""}>My Profile</NavLink></li>
            </ul>
          </div>

         
          <div className="flex ml-5 md:ml-0 justify-center gap-2">
            <img className="w-12 h-12 rounded-full" src={Logo} alt="" />
            <h1 className="font-bold text-4xl ">Fin<span className="text-gray-700">Ease</span></h1>
          </div>
        </div>

       
        <div className="navbar-center hidden lg:flex">
          <ul className="gap-5 menu-horizontal px-1">
            <li class="text-black hover:text-gray-700" ><NavLink to="/" className={({ isActive }) => isActive ? "underline underline-offset-4 font-semibold" : ""}>Home</NavLink></li>
            <li class="text-black hover:text-gray-700"><NavLink to="Add-Transaction" className={({ isActive }) => isActive ? "underline underline-offset-4 font-semibold" : ""}>Add Transaction</NavLink></li>
            <li class="text-black hover:text-gray-700" ><NavLink to="My-Transaction" className={({ isActive }) => isActive ? "underline underline-offset-4 font-semibold" : ""}>My Transactions</NavLink></li>
            <li class="text-black hover:text-gray-700" ><NavLink to="Reports" className={({ isActive }) => isActive ? "underline underline-offset-4 font-semibold" : ""}>Reports</NavLink></li>
             <li class="text-black hover:text-gray-700" ><NavLink to="My-Profile" className={({ isActive }) => isActive ? "underline underline-offset-4 font-semibold" : ""}>My Profile</NavLink></li>
          </ul>
        </div>

    
        <div className="navbar-end relative" ref={dropdownRef}>
          {user ? (
            <div className="flex items-center gap-2 relative">
              <img
                src={user?.photoURL || "https://i.ibb.co/2kMHDjv/default-avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              <FiChevronDown
                className="cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-12 w-48 text-black bg-white shadow-lg rounded-lg p-4 text-left z-10">
                  <p className="font-semibold">{user.displayName || "User"}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>

                  <button
                    onClick={handleLogout}
                    className="mt-3 w-full bg-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-400"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="login">
              <button className="btn text-black bg-gray-300 flex items-center gap-2">
                <FiLogIn size={20} /> Login
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
