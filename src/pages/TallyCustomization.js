import React from "react";
import { motion } from "framer-motion";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const customizationOptions = [
    {
      id: 1,
      title: "Custom Invoice Format",
      description: "Design invoices with your business logo, terms, additional fields like transport info, and barcode/QR codes.",
    },
    {
      id: 2,
      title: "Report Customization",
      description: "Get personalized financial, GST, MIS, or stock reports that meet specific managerial or audit requirements.",
    },
    {
      id: 3,
      title: "Additional Fields in Masters & Vouchers",
      description: "Add fields such as email, delivery date, E-Way Bill, or alternate contact across ledgers and transactions.",
    },
    {
      id: 4,
      title: "TDL Development",
      description: "Write or modify TDL (Tally Definition Language) code to introduce new features or automation into your system.",
    },
    {
      id: 5,
      title: "Workflow & Validation Automation",
      description: "Set up custom approval flows, mandatory field checks, or alerts for missing or incorrect entries.",
    },
    {
      id: 6,
      title: "Software Integration",
      description: "Connect Tally with 3rd-party CRMs, ERPs, web apps, or Excel to create a seamless multi-platform ecosystem.",
    },
    {
      id: 7,
      title: "User-wise Menu Restrictions",
      description: "Limit access to specific reports or masters for selected users to enhance security and control.",
    },
    {
      id: 8,
      title: "Auto Email & SMS Alerts",
      description: "Send automatic alerts for overdue invoices, daily summaries, or transaction alerts to customers and staff.",
    },
    {
      id: 9,
      title: "Multilingual Report Customization",
      description: "Customize Tally outputs in regional languages like Hindi or Marathi for better local team understanding.",
    },
  ];
  

const TallyCustomization = () => {
  return (
<>
<Header/>
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-blue-700 text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Tally Customization Services
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customizationOptions.map((option, index) => (
          <motion.div
            key={option.id}
            className="p-6 bg-white border border-gray-200 rounded-2xl shadow hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mb-3">
              {option.id}
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              {option.title}
            </h3>
            <p className="text-gray-600">{option.description}</p>
          </motion.div>
        ))}
      </div>
    </div>

    <Footer/>
    </>
  );
};

export default TallyCustomization;
