import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const trainingModules = {
    "Ezo Billing": [
      {
        id: 1,
        title: "Introduction to Ezo Billing",
        description: "Understand the dashboard, core features, and billing workflow in Ezo Billing.",
      },
      {
        id: 2,
        title: "Invoice Management",
        description: "Create professional invoices, send them to clients, and track payments in real time.",
      },
      {
        id: 3,
        title: "Expense Tracking",
        description: "Capture business expenses with categories, notes, and attachments for records.",
      },
      {
        id: 4,
        title: "Reports & Analytics",
        description: "Generate insights with sales reports, GST reports, and outstanding summaries.",
      },
      {
        id: 5,
        title: "User Roles & Permissions",
        description: "Manage multiple users with different access levels and activity tracking.",
      },
      {
        id: 6,
        title: "Cloud Backup & Restore",
        description: "Learn how to securely back up and restore your data on Ezo’s cloud system.",
      },
    ],
    "Tally Prime": [
      {
        id: 1,
        title: "Getting Started with Tally Prime",
        description: "Installation, activation, and exploring the new simplified interface.",
      },
      {
        id: 2,
        title: "Ledger & Vouchers",
        description: "Master ledger creation, voucher entry, and common accounting operations.",
      },
      {
        id: 3,
        title: "Inventory Management",
        description: "Stock items, units of measurement, and godown tracking in Tally Prime.",
      },
      {
        id: 4,
        title: "GST Filing",
        description: "Setup GST in Tally, file returns, and reconcile mismatch reports.",
      },
      {
        id: 5,
        title: "Payroll & Employee Management",
        description: "Maintain employee records, define pay heads, and generate payslips.",
      },
      {
        id: 6,
        title: "Security & Data Backup",
        description: "Enable user security controls, backups, and remote access for your data.",
      },
    ],
  };
  

const TrainingLearning = () => {
  const [activeProduct, setActiveProduct] = useState("Tally Prime");

  return (

    <>

    <Header/>
    <div className="px-4 py-14 max-w-7xl mx-auto">
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center text-blue-700 mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Training Center
      </motion.h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        {Object.keys(trainingModules).map((product) => (
          <button
            key={product}
            onClick={() => setActiveProduct(product)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border 
              ${
                activeProduct === product
                  ? "bg-blue-700 text-white border-blue-700 shadow-lg"
                  : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
              }`}
          >
            {product}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainingModules[activeProduct].map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <div className="mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold">
                {item.id}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
<Footer/>
    </>
  );
};

export default TrainingLearning;
