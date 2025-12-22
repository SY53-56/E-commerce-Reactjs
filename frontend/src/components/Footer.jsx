//src/app.jsx

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '../context/themeContext';

const Footer = () => {
  const {theme} = useTheme()
  return (
    <footer className={`  w-full py-4 border-t-2 ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-950 text-white"}`}>
      <div className="container mx-auto grid grid-cols-1 
            md:grid-cols-4 gap-8 w-11/12">

        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Main Market</h1>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Contacts</h3>
          <p>Phone: +91 7909080171</p>
          <p>Email: info@example.com</p>
          <p>Address: 123 Main Street, City</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Social Media</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/" target="_blank"
              rel="noopener noreferrer">
              <FaFacebook className=" text-2xl 
                            hover:text-gray-300" />
            </a>
            <a href="https://twitter.com/" target="_blank"
              rel="noopener noreferrer">
              <FaTwitter className=" text-2xl
                            hover:text-gray-300" />
            </a>
            <a href="https://www.instagram.com/" target="_blank"
              rel="noopener noreferrer">
              <FaInstagram className=" text-2xl
                            hover:text-gray-300" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank"
              rel="noopener noreferrer">
              <FaLinkedin className=" text-2xl
                            hover:text-gray-300" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Product</h3>
          <ul>
            <li><a href="#" className="hover:underline">
              Web Development</a></li>
            <li><a href="#" className="hover:underline">
              App Development</a></li>
            <li><a href="#" className="hover:underline">
              SEO Optimization</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;