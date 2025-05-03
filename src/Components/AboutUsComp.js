import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800 mb-6"
        >
          About Gulli Technology
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-600 text-lg leading-relaxed"
        >
          At Gulli Technology, we follow a well-defined methodology that empowers customers to 
          harness the full potential of Tally software — effectively and affordably. Our success 
          comes from our flexibility, customer-centric approach, and a dedicated team.
        </motion.p>
      </div>

      <motion.div
        className="mt-12 max-w-4xl mx-auto grid gap-8 sm:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.div
          className="bg-gray-50 p-6 rounded-xl shadow-sm text-left"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Who We Are</h3>
          <p className="text-gray-600">
            Gulli Technology is an IT consultancy and Tally service provider based in Rewa, Madhya Pradesh. 
            We serve a wide range of sectors including CA firms, Manufacturing, Pharmaceuticals, 
            Trading, Government, and more.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-50 p-6 rounded-xl shadow-sm text-left"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Our Office</h3>
          <p className="text-gray-600">
            MPS Complex, Near Subhash Chowk,<br />
            Boda Bag Road, Civil Lines,<br />
            Rewa (M.P.) - 486001
          </p>
          <p className="mt-2 text-gray-600">
            📧 <strong>Email:</strong> gullitech.rewa@gmail.com<br />
            📞 <strong>Contact:</strong> 9755377307, 7000901830, 8103717660
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
