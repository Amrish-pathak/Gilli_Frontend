import React from "react";
import { motion } from "framer-motion";

const TallyPrimeInfo = () => {
  return (
    <motion.div 
      className="Main-Content-Page-Info"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="First-Content-Page-Info">
        <motion.div 
          className="Title-Info"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="Info-Name">
            <h2>Tally Prime</h2>
          </div>
          <motion.div 
            className="Info-Name-img"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src="/woman with laptop.webp" alt="img" />
          </motion.div>
        </motion.div>
      </div>

      <div className="Second-Content-Page-Info">
        <motion.div 
          className="Sab-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <hr />
          <p className="Tally-title">Tally Prime</p>
          <hr />
        </motion.div>

        <div className="Second-Child-Manager">
          <motion.div 
            className="Second-Content-Child-1"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="Child-1-Heading">Managing your Business just got Simpler</h2>
            <p className="Child-1-Sub-heading">Experience simpler and faster way of working</p>
            <p className="Child-1-Text">
              TallyPrime is an integrated business management software. You can manage Accounting, Inventory,
              Statutory and compliance, Banking, Payroll and various other processes.
            </p>
          </motion.div>

          <motion.div 
            className="Second-Content-Child-2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <img src="/product-page-main.png" width="100%" alt="Tally Prime" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TallyPrimeInfo;
