import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div
      id="about"
      className="min-h-[40vh] pt-12  px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Container with subtle card effect */}
        <div className="bg-white/60 pt-12">
          {/* Animated Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-black-700 text-center mb-16"
          >
            About LinkUp
          </motion.h2>

          {/* Animated Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-800 text-lg sm:text-xl space-y-8 leading-relaxed"
          >
            <p>
              LinkUp was created with one goal in mind:{" "}
              <span className="text-blue-600 font-semibold">to empower professionals</span> around the world to build meaningful connections.
              In today’s fast-moving digital world, professional networking is more than just resumes and job posts, it’s about relationships,
              knowledge sharing, and collaboration.
            </p>

            <p>
              Our mission is to help individuals and organizations grow through seamless networking, real-time communication,
              and a supportive professional community. Whether you're a student, freelancer, entrepreneur, or executive —{" "}
              <span className="text-blue-600 font-semibold">you belong here</span>.
            </p>

            {/* Belief Card */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-blue-100">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Our Belief</h3>
              <p>
                We believe that{" "}
                <span className="font-semibold text-blue-700">great opportunities come from great networks</span>. LinkUp is the starting point
                for your next big opportunity, collaboration, and growth.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
