import React from "react";
import Logo from "../assets/logo.jpg";
import {FaXTwitter} from "react-icons/fa6"; // Twitter(X) New Logo
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-500 to-gray-700 text-white py-10 mt-10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* ✅ Logo + Website Name */}
        <div className="flex flex-col items-center md:items-start">
          <img src={Logo} className="w-16 h-16 rounded-full mb-3" alt="Logo" />
          <h2 className="text-2xl font-bold">
            Fin<span className="text-blue-500">Ease</span>
          </h2>
          <p className="text-gray-300 mt-2">Personal Finance Manager</p>
        </div>

        {/* ✅ Contact */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="text-gray-300">Email: support@finease.com</p>
          <p className="text-gray-300">Phone: +880-1234-567890</p>
          <p className="text-gray-300">Address: Dhaka, Bangladesh</p>
        </div>

        {/* ✅ Terms & Social Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-3">Important Links</h3>
          <a href="#" className="block text-gray-300 hover:text-blue-400">
            Terms & Conditions
          </a>
          <a href="#" className="block text-gray-300 hover:text-blue-400">
            Privacy Policy
          </a>
          <h3 className="text-xl font-semibold mt-5 mb-3">Social Media</h3>
        
          <div className="flex justify-center md:justify-start gap-4 text-3xl">
            {/* ✅ Facebook */}
            <a
              href="https://facebook.com/"
              target="_blank"
              className="text-gray-300 hover:text-blue-500"
            >
              <FaFacebook />
            </a>

            {/* ✅ Instagram */}
            <a
              href="https://instagram.com/"
              target="_blank"
              className="text-gray-300 hover:text-pink-500"
            >
              <FaInstagram />
            </a>

            {/* ✅ Twitter/X */}
            <a
              href="https://twitter.com/"
              target="_blank"
              className="text-gray-300 hover:text-gray-200"
            >
              <FaXTwitter />
            </a>

            {/* ✅ YouTube */}
            <a
              href="https://youtube.com/"
              target="_blank"
              className="text-gray-300 hover:text-red-500"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Bottom Text */}
      <div className="text-center text-gray-300 mt-10 border-t pt-5">
        © 2025 FinEase. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
