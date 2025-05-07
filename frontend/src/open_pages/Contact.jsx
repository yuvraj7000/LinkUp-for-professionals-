



import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div id="contact" className="pt-28 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side Image with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src="https://img.freepik.com/free-vector/customer-support-flat-illustration_23-2148887720.jpg?t=st=1714148460~exp=1714152060~hmac=3749f2fe8c2188c9af31b42e9cfa39e7a39aa14277ef72b0cbbdcad33c7f2c72&w=826"
            alt="Contact Us"
            className="w-full max-w-md object-contain rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Right Side Content with Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 text-center hover:shadow-3xl transition-shadow duration-500"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-10 leading-relaxed">
            We'd love to hear from you! Feel free to reach out through the contact details below.
          </p>
<div className="flex justify-center">
          <div className="space-y-10 text-lg">
            <div className="flex items-center space-x-5 justify-center">
              <FaEnvelope className="text-blue-600 text-3xl" />
              <div className="text-left">
                <h3 className="font-semibold text-blue-600">Email</h3>
                <p className="text-gray-700">yuvraj7000raju@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-5 justify-center">
              <FaPhoneAlt className="text-blue-600 text-2xl" />
              <div className="text-left">
                <h3 className="font-semibold text-blue-600">Mobile</h3>
                <p className="text-gray-700">+91 9999999999</p>
              </div>
            </div>
          </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

