import React from "react";
import { motion } from "framer-motion";
import SocialButtons from "./SocialButtons";

const Footer = () => {
  return (
    <motion.footer
      className="relative bg-[#0a0a0a] text-white py-12 px-6 md:px-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start pb-8 border-b border-gray-800">
        
        {/* Logo & About */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img
              src="/IMAGES/Logo.jpg"
              alt="Logo"
              className="h-12 w-12 rounded-full shadow-lg transition hover:scale-105"
            />
            <h2 className="text-2xl font-bold text-[#00aaff]">Gulli Technology</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Custom software solutions and IT staffing services.  
            We build **scalable, secure, and innovative** technology for your business.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#00aaff]">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            {["Home", "Product", "Services", "About Us", "Contact Us"].map((link, index) => (
              <motion.li 
                key={index} 
                whileHover={{ x: 5, color: "#00aaff" }} 
                transition={{ duration: 0.2 }}
              >
                <a href={`${link.replace(/\s+/g, "_")}.html`} className="flex items-center space-x-2">
                  <i className="fa fa-chevron-right"></i>
                  <span>{link}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#00aaff]">Contact Us</h3>
          <ul className="space-y-3">
            {[
              { icon: "/IMAGES/mail-icon.png", text: "gullitech.rewa@gmail.com" },
              { icon: "/IMAGES/contact-icon.png", text: "+91-9755377307" },
              { icon: "/IMAGES/location_pin_0.png", text: "MPS Complex, Near Subhash Chowk, Rewa (M.P.) - 486001" }
            ].map((item, index) => (
              <li key={index} className="flex items-center space-x-3">
                <img src={item.icon} alt="Icon" className="h-6 w-6 opacity-75 hover:opacity-100 transition" />
                <span className="hover:text-[#00aaff] transition">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-gray-400 text-sm">
        
        {/* Copyright */}
        <p>&copy; {new Date().getFullYear()} Gulli Technology | All Rights Reserved</p>

        {/* Social Media */}
        <div className="flex space-x-4 mt-3 md:mt-0">
          {/* {[
            { link: "#", icon: "fa-twitter" },
            { link: "https://www.facebook.com/people/Gulli-Technology/100081831011339/", icon: "fa-facebook" },
            { link: "#", icon: "fa-instagram" },
            { link: "https://www.youtube.com/channel/UC31bjs-D9dKHm5jDfVogPsQ", icon: "fa-youtube-play" },
            { link: "#", icon: "fa-linkedin-square" }
          ].map((social, index) => (
            <motion.a 
              key={index} 
              href={social.link} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#00aaff" }}
              className="text-gray-400 hover:text-[#00aaff] transition text-2xl"
            >
              <i className={`fa ${social.icon}`}></i>
            </motion.a>
          ))} */}

          <SocialButtons/>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
