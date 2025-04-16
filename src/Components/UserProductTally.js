import React, { useState, useEffect } from "react";
import axios from "axios";
import TallyPrimeInfo from "./TallyPrimeInfo";
import DoubtManager from "./DoubtManager";
import BillingComponent from "./BillingComponent";



const API_URL = "https://gullibackend.onrender.com/admin/tally-prime/owner/products";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedMonths, setSelectedMonths] = useState({});
const [showBillingInfo, setShowBillingInfo] = useState(false);



  const handleMonthChange = (productId, price, month) => {
    setSelectedMonths((prev) => ({
      ...prev,
      [productId]: month,
    }));

    setSelectedProduct((prev) =>
      prev && prev.id === productId ? { ...prev, months: month } : prev
    );
  };



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  const handleBuyNow = (product, months) => {
    const basePrice = product.price * months;
    const gst = basePrice * 0.18;
    const total = basePrice + gst;

    setSelectedProduct({
      ...product,
      months,
      basePrice,
      gst,
      total,
    });
  };


  return (
    <>
      <TallyPrimeInfo />
      <div className="Our-Pricing  p-8">
        <h1 className="Pricing-Heading">Our Products</h1>
        <div className="Price-Card flex flex-wrap justify-center gap-4">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="Price-Card-First Card-importent-2 Card-importent PC-1 bg-gray-200 animate-pulse w-72 h-96 p-6 rounded-lg shadow-lg flex flex-col justify-center">
                <h2 className="pr-amount RSP-rsp bg-gray-300 h-6 w-24 mx-auto mb-4 rounded"></h2>
                <p className="p-card bg-gray-300 h-4 w-16 mx-auto mb-4 rounded"></p>
                <div className="bt-b">
                  <hr className="border-gray-400" />
                </div>
                <p className="p-card bg-gray-300 h-4 w-32 mx-auto mb-4 rounded"></p>
                <p className="p-card bg-gray-300 h-4 w-32 mx-auto mb-4 rounded"></p>
                <div className="Buy-btn">
                  <div className="btn bg-gray-400 h-10 w-32 mx-auto rounded-full"></div>
                </div>
              </div>
            ))
            : products.map((product) => {
              if (product.productType.includes("Rental")) {
                const month = selectedMonths[product.id] || 1;
                const totalAmount = product.price * month;
                const gstAmount = (totalAmount * 0.18).toFixed(2);

                // Rental product UI
                return (
                  <div key={product.id} className="Price-Card-First Card-importent-2 Card-importent PC-1 w-72 h-96 p-6 rounded-lg shadow-lg bg-white">
                    <h2 className="pr-amount RSP-rsp flex items-center justify-center text-3xl font-bold">
                      {totalAmount} <span className=" ml-1 text-black text-sm">₹</span>
                    </h2>
                    <p className="p-card">Per Month</p>
                    <h2 className="p-heading font-bold">{product.productType}</h2>
                    <div className="bt-b">
                      <hr />
                    </div>
                    <p className="p-card">{product.userEdition}<br />For Standalone PCs</p>
                    <p className="p-card">
                      Months
                      {[1, 3, 12].map((m) => (
                        <label key={m} className="ml-1">
                          <input
                            type="radio"
                            className="check-box"
                            name={`${product.id}_months`}
                            value={m}
                            checked={(selectedMonths[product.id] || 1) === m}
                            onChange={() => handleMonthChange(product.id, product.price, m)}
                          />{" "}
                          {m}
                        </label>
                      ))}
                      <br />
                      <span className="text-center">
                        +18% GST (INR {gstAmount})<br />
                      </span>
                    </p>

                    <div className="Buy-btn">
                      <button className="btn btn-by" onClick={() => handleBuyNow(product, selectedMonths[product.id] || 1)}>
                        Buy Now
                      </button>
                    </div>


                  </div>
                );
              } else {
                // Non-Rental product UI
                return (
                  <div key={product.id} className="Price-Card-First Card-importent-2 Card-importent PC-1 w-72 h-96 p-6 rounded-lg shadow-lg bg-white">
                    <h2 className="pr-amount RSP-rsp flex items-center justify-center text-3xl font-bold">
                      {product.price} <span className=" ml-1 text-black text-sm">₹</span>
                    </h2>
                    <p className="p-card">(Peputal)</p>
                    <h2 className="p-heading font-bold">{product.productType}</h2>
                    <div className="bt-b">
                      <hr />
                    </div>
                    <p className="p-card">{product.userEdition}<br />For Standalone PCs</p>
                    <p className="p-card">


                      <br />
                      <span className="text-center">+18% GST (INR {(product.price * 0.18).toFixed(2)})</span>
                    </p>
                    <div className="Buy-btn">
                      <button className="btn btn-by" onClick={() => handleBuyNow(product, 1)}>
                        Buy Now
                      </button>
                    </div>
                  </div>
                );
              }
            })}


        </div>


        {selectedProduct && (
          <BillingComponent
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onConfirm={() => setShowBillingInfo(true)}
        />
        )}
   
  


      </div>
      <DoubtManager />
    </>
  );
};

export default ProductPage;
