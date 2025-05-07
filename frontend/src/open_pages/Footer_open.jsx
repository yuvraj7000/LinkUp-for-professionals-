import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLinkedin, FiGithub, FiMail, FiGlobe } from "react-icons/fi";

export default function Footer_open() {
  const footerLinks = [
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/yuvraj7000/" },
    { icon: <FiGithub />, url: "https://github.com/yuvraj7000" },
    { icon: <FiGlobe />, url: "https://yuvrajyadav.tech" },
  ];

  return (
    <footer className="bg-gray-150 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 align-items-center justify-items-center">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <Link to="/" className="text-2xl font-bold text-blue-600">
              LinkUp
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Connecting professionals, creating opportunities.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <div className=" flex flex-row gap-8 flex-wrap">
              {footerLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300 group"
                  >
                    {link.name}
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-blue-600"></span>
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="text-gray-900 font-semibold mb-4">Connect Developer</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 p-2 hover:bg-blue-50 rounded-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 mt-12 pt-8 text-center"
        >
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} LinkUp. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}