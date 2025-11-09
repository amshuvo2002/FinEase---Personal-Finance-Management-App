import React from "react";
import { NavLink } from "react-router";
import Logo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <div>
      <div>
        <div className="navbar bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm">
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>

              {/* Mobile Menu */}
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-4 font-semibold"
                        : ""
                    }
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="Add-Transaction"
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-4 font-semibold"
                        : ""
                    }
                  >
                    Add Transaction
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="My-Transaction"
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-4 font-semibold"
                        : ""
                    }
                  >
                    My Transactions
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="Reports"
                    className={({ isActive }) =>
                      isActive
                        ? "underline underline-offset-4 font-semibold"
                        : ""
                    }
                  >
                    Reports
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Logo */}
            <div className="flex ml-15 md:ml-0 justify-center gap-3">
              <img className="w-12 h-12 rounded-full" src={Logo} alt="" />
              <h1 className="font-bold text-4xl ">
                Fin<span className="text-gray-700">Ease</span>
              </h1>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="gap-5 menu-horizontal px-1">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-4 font-semibold"
                      : ""
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="Add-Transaction"
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-4 font-semibold"
                      : ""
                  }
                >
                  Add Transaction
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="My-Transaction"
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-4 font-semibold"
                      : ""
                  }
                >
                  My Transactions
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="Reports"
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-4 font-semibold"
                      : ""
                  }
                >
                  Reports
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Login Button */}
          <div className="navbar-end">
            <NavLink to="login">
              <a className="btn">Login</a>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
