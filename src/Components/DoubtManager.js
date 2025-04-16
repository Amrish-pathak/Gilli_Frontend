import React from "react";
import { motion } from "framer-motion";

const DoubtManager = () => {
  return (
    <motion.div 
      className="Doubt-Manager Bg-Role"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="Colur-Maneger">
        <motion.div 
          className="Still-Doubt"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="p-heading-55">Still in Doubt?</h3>
          </div>
          <div>
            <p className="text-center">
              We want you to experience the product and understand how it suits your business.
              <span id="text-nn"> Tally comes with a 7-day free trial </span>
              that gives you full access to all the features of the product. Go ahead, give us a try!
            </p>
          </div>
          <div>
            <motion.a 
              href="Contact.html" 
              className="btn-by btn bt-mg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Now
            </motion.a>
            <motion.a 
              href="Contact.html" 
              className="btn-by btn bt-mg1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DoubtManager;
