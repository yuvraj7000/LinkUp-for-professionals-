import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiMessageSquare, FiBriefcase, FiFileText, FiBell, FiShare } from "react-icons/fi";

const features = [
  {
    title: "Create & Share Posts",
    description: "Express your thoughts, share ideas, or showcase your latest project with the professional community.",
    icon: <FiShare className="w-8 h-8" />,
    color: "bg-purple-100"
  },
  {
    title: "Make Connections",
    description: "Send and accept connection requests to build a strong, relevant network of professionals in your field.",
    icon: <FiUsers className="w-8 h-8" />,
    color: "bg-blue-100"
  },
  {
    title: "Private Messaging",
    description: "Chat directly with your connections. Collaborate, mentor, or simply stay in touch.",
    icon: <FiMessageSquare className="w-8 h-8" />,
    color: "bg-green-100"
  },
  {
    title: "Job Opportunities",
    description: "Discover job openings posted by top companies or individuals. Apply directly through the platform.",
    icon: <FiBriefcase className="w-8 h-8" />,
    color: "bg-yellow-100"
  },
  {
    title: "User Profiles",
    description: "Highlight your skills, experience, and achievements with customizable profiles.",
    icon: <FiFileText className="w-8 h-8" />,
    color: "bg-pink-100"
  },
  {
    title: "Smart Notifications",
    description: "Stay up-to-date with connection requests, messages, job updates, and post interactions.",
    icon: <FiBell className="w-8 h-8" />,
    color: "bg-orange-100"
  },
];

export default function Features() {
  return (
    <section id="features" className="relative  py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative">
            Powerful Features
        
          </h2>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Everything you need to grow your professional network and career
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                <div className="text-blue-600 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-xl transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}