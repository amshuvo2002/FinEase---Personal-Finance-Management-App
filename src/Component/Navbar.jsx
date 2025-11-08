import React from "react";
import { NavLink } from "react-router";
import Logo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <div>
      <div>
        <div className="navbar bg-base-100 shadow-sm">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                 <li>
                <NavLink to={"/"}>
                  <a>Home</a>
                </NavLink>
              </li>
              <li>
                <NavLink to={'Add-Transaction'}>
                  <a>Add Transaction </a>
                </NavLink>
              </li>
              <li>
                <NavLink to={'My-Transactions'}>
                  <a>My Transactions </a>
                </NavLink>
              </li>
              <li>
                <NavLink to={'Reports'}>
                  <a>Reports</a>
                </NavLink>
              </li>
              </ul>
            </div>
            <div className="flex justify-center gap-3">
              <img className="w-12 h-12 rounded-full" src={Logo} alt="" />
              <h1 className="font-bold text-4xl">FinEase</h1>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink to={"/"}>
                  <a>Home</a>
                </NavLink>
              </li>
              <li>
                <NavLink to={'Add-Transaction'}>
                  <a>Add Transaction </a>
                </NavLink>
              </li>
              <li>
                <NavLink to={'My-Transaction'}>
                  <a>My Transactions </a>
                </NavLink>
              </li>
              <li>
                <NavLink to={'Reports'}>
                  <a>Reports</a>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <NavLink to={"login"}>
              <a className="btn">Login</a>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
