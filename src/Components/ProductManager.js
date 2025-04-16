import { useState } from "react";
import { motion } from "framer-motion";
import ProductCrad from "./ProductCRAD";

const ProductManagerHeader = () => {
  const [selectedProduct, setSelectedProduct] = useState("Tally Prime");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center p-6">
      {/* Header with buttons */}
      <header className="bg-gray-900 w-full p-6 flex justify-center gap-6 rounded-lg shadow-lg">
        {["Tally Prime", "Ezo Billing"].map((product) => (
          <motion.button
            key={product}
            className={`px-8 py-3 text-lg font-semibold rounded-full text-white transition-all duration-300 ease-in-out
              ${
                selectedProduct === product
                  ? product === "Tally Prime"
                    ? "bg-blue-500 shadow-md scale-105"
                    : "bg-green-500 shadow-md scale-105"
                  : "bg-gray-700 hover:scale-105 hover:shadow-lg hover:bg-opacity-80"
              }`}
            onClick={() => setSelectedProduct(product)}
            whileTap={{ scale: 0.95 }}
          >
            {product}
          </motion.button>
        ))}
      </header>

      {/* Product-specific content */}
      <motion.main
        key={selectedProduct}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-12 p-8 bg-white rounded-2xl shadow-lg w-full max-w-4xl text-center"
      >
        {selectedProduct === "Tally Prime" ? (
            <>
          <div>
            <h2 className="text-3xl font-extrabold text-blue-600">Tally Prime Dashboard</h2>
            <p className="text-gray-600 mt-3 text-lg">Manage settings, users, and reports for Tally Prime.</p>
          <ProductCrad/>
          </div>
            
          </>
        ) : (
          <div>
            <h2 className="text-3xl font-extrabold text-green-600">Ezo Billing Dashboard</h2>
            <p className="text-gray-600 mt-3 text-lg">Manage invoices, billing, and reports for Ezo Billing.</p>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default ProductManagerHeader;
