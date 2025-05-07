// Enhanced Navbar.jsx
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar_open() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-white backdrop-blur-lg bg-opacity-90 shadow-sm transition-all duration-300 ease-in-out bg-gray-150">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full px-10">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-wide">
        <img className='mx-auto h-10 w-auto' src='/linkup.png' alt='Linkup' />
        </Link>
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex space-x-6">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            >
              <Link
                to={link.path}
                className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="relative flex items-center justify-center space-x-3 ml-4">
  {/* New Div Positioned at Top Right */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.7, duration: 0.6 }}
  >
    <Link
      to="/login"
      className="px-4 py-2 rounded-lg font-medium text-blue-600 hover:bg-blue-50 transition-all duration-300 border border-blue-600"
    >
      Login
    </Link>
  </motion.div>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 0.6 }}
  >
    <Link
      to="/signup"
      className="px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      Signup
    </Link>
  </motion.div>
  <div style={{fontSize: '10px' }} className=" text-grey">
    demo account- <br />
    username: guest <br />
    password: guest123
  </div>
</div>
      </div>

      {/* Mobile Menu Button */}
      <motion.div
        className="md:hidden z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </motion.div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-64 bg-white shadow-2xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex-1 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-4 border-t pt-6">
            <Link
              to="/login"
              className="px-4 py-2 text-center rounded-lg font-medium text-blue-600 border border-blue-600 hover:bg-blue-50"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-center rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Signup
            </Link>
            
          </div>
          <div
              className="px-4 py-2 text-center "
            >
              demo account- <br />
              username: guest <br />
              password: guest123
            </div>
        </div>
      </div>
      </div>
    </nav>
  );
}