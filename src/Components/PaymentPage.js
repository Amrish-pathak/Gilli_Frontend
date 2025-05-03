import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'; // You can use axios for API requests

const PaymentPage = () => {
  const { state } = useLocation(); // Get the state passed from the BillingComponent
  const { product, totalPayable } = state || {}; // Destructure product and totalPayable
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  // Ensure product and totalPayable exist
  useEffect(() => {
    if (!product || !totalPayable) {
      navigate("/");
    }
  }, [product, totalPayable, navigate]);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Create payment on the backend (send payment request data)
      const response = await axios.post("/api/payment/process", {
        productId: product.id,
        totalPayable,
        userId: "user_id_here", // Replace with actual user ID
      });

      if (response.status === 200) {
        // Assuming you get payment URL or gateway redirect URL
        const paymentUrl = response.data.paymentUrl;

        // Redirect to the payment gateway
        window.location.href = paymentUrl;
      } else {
        alert("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while processing the payment. Please try again.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl w-[90%] max-w-md">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Payment Page
        </h2>

        {/* Product Details */}
        <div className="space-y-4 text-gray-700 text-sm sm:text-base">
          <div className="flex justify-between">
            <span className="font-medium">Product:</span>
            <span className="text-gray-900">{product.productType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">User Edition:</span>
            <span className="text-gray-900">{product.userEdition}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Total Payable:</span>
            <span className="text-gray-900">₹{totalPayable.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`py-2 px-6 rounded-xl text-white ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
            } transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400`}
          >
            {isProcessing ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
