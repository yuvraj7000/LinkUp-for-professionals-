import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import networkingAnimation from "../assets/networking.json"; 

export default function Home() {
  return (
    <div className="min-h-screen pt-10">
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 xl:gap-16">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-6 md:space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight"
            >
              Transform Your Career with{" "}
              <span className="text-blue-600 relative">
                LinkUp
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full h-2 bg-blue-100 rounded-full"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl"
            >
              Revolutionize your professional networking experience. Build
              meaningful connections, discover opportunities, and accelerate
              your career growth with our intelligent platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col xs:flex-row gap-4 md:gap-6"
            >
              <Link
                to="/signup"
                className="px-6 py-3.5 md:px-8 md:py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started
              </Link>
              <Link
                to="/features"
                className="px-6 py-3.5 md:px-8 md:py-4 text-lg font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 border-2 border-blue-600 shadow-sm hover:shadow-md"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6 pt-8"
            >
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-blue-600">50K+</span>
                <span className="text-gray-600">Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-blue-600">1M+</span>
                <span className="text-gray-600">Connections Made</span>
              </div>
            </motion.div>
          </div>

          {/* Image Section */}
          <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="lg:w-1/2 relative mt-10 lg:mt-0"
      >
        
          <Lottie 
            animationData={networkingAnimation}
            loop={true}
            autoplay={true}
            className="w-full h-full"
          />
         
            
            {/* Floating Card Elements */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-8 left-8 bg-white p-4 rounded-xl shadow-lg"
            >
              <span className="block text-sm text-gray-600">Daily Active Users</span>
              <span className="text-2xl font-bold text-blue-600">2,345+</span>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}