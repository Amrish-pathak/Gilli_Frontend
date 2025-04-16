import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BillingComponent = ({ product, onClose }) => {
  const navigate = useNavigate();

  const isRental = product.productType?.toLowerCase() === "rental";
  const months = isRental ? product.months : 1;
  const basePrice = product.price * months;
  const gst = basePrice * 0.18;
  const total = basePrice + gst;

  const handleConfirm = () => {
    navigate("/billing-info", {
      state: {
        product,
        totalPayable: total,
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative bg-white p-6 sm:p-8 rounded-3xl shadow-2xl w-[90%] max-w-md transition-transform scale-100">

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close billing summary"
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors focus:outline-none"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Billing Summary
        </h2>

        {/* Info Section */}
        <div className="space-y-4 text-gray-700 text-sm sm:text-base">
          <div className="flex justify-between">
            <span className="font-medium">Product:</span>
            <span className="text-gray-900">{product.productType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">User Edition:</span>
            <span className="text-gray-900">{product.userEdition}</span>
          </div>

          {isRental && (
            <div className="flex justify-between">
              <span className="font-medium">Duration:</span>
              <span className="text-gray-900">
                {months} Month{months > 1 ? "s" : ""}
              </span>
            </div>
          )}

          <hr className="my-4 border-gray-300" />

          {/* Pricing */}
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span>Base Price:</span>
              <span>₹{basePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>GST (18%):</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-semibold text-blue-700 border-t pt-4 border-gray-200">
            <span>Total Payable:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-3 justify-between">
          <button
            onClick={onClose}
            className="w-1/2 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="w-1/2 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingComponent;
