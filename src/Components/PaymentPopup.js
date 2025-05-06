import React, { useState, useEffect } from "react";

const PaymentPopup = ({ isOpen, onClose, product,buyerinfo }) => {
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [utrNumber, setUtrNumber] = useState("");

  const fetchPaymentRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://gullibackend.onrender.com/api/payments/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product }),
      });
      const data = await response.json();
      setPaymentDetails({
        qrUrl: data.qrImageUrl,
        paymentId: data.paymentId,
        amount: data.totalAmount,
      });
    } catch (error) {
      console.error("Payment request error:", error);
      alert("Failed to create payment request.");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUTR = async () => {
    if (!utrNumber.trim()) {
      alert("Please enter UTR/Transaction ID");
      return;
    }
    try {
      const response = await fetch("https://gullibackend.onrender.com/api/payments/utr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          paymentId: paymentDetails.paymentId,
          amount:paymentDetails.amount,
          utr: utrNumber,
          buyerinfo : buyerinfo,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Payment submitted successfully!");
        onClose();
      } else {
        alert("Payment confirmation failed.");
      }
    } catch (error) {
      console.error("UTR submission error:", error);
      alert("Something went wrong during confirmation.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPaymentRequest();
      setPaymentDetails(null);
      setUtrNumber("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
      <div className="bg-white w-full sm:w-[400px] rounded-t-2xl p-6 animate-slideUp relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-400 hover:text-black text-2xl"
        >
          ×
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-60">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading payment details...</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Scan & Pay
            </h2>

            {paymentDetails && (
              <>
              <div className="paymentid">Order ID : {paymentDetails.paymentId}</div>
              <div className="amount">Amount : {paymentDetails.amount}</div>
                <img
                  src={paymentDetails.qrUrl}
                  alt="QR Code"
                  className="w-48 h-48 mx-auto mb-3 rounded-lg border"
                />
                <img
                  src="./upi-logo.jpg"
                  alt=""
                  className="w-48 h-24 mx-auto rounded-lg"
                />

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-700 font-medium">
                    Enter UTR/Transaction ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter UTR Number"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleSubmitUTR}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-6 py-3 rounded-lg transition duration-200"
                >
                  Submit Payment
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPopup;
