import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import PaymentPopup from "./PaymentPopup";

function InputField({ name, label, type = "text", placeholder, required = false, value, onChange }) {
  return (
    <div>
      {/* {label && <label className="block font-medium mb-1">{label}</label>} */}
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

const BillingInfoPage = () => {
  const [paymentPopupOpen, setPaymentPopupOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product;


  const [formData, setFormData] = useState({
    name: "",
    orgName: "",
    email: "",
    pinCode: "",
    state: "",
    city: "",
    gstin: "",
    mobile: "",
    address: "",
    agreePolicy: false,
    agreeWhatsApp: false,
    noGstin: false,
    paymentMethod: "upi",
  });



  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 font-bold">
        Product information missing. Please go back and try again.
      </div>
    );
  }

  const handleOpenPayment = () => {
    setPaymentPopupOpen(true);
  };

  const handleClosePayment = () => {
    setPaymentPopupOpen(false);
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreePolicy) {
      alert("Please agree to the policies.");
      return;
    }
    handleOpenPayment()
    console.log("Billing Info Submitted:", formData);
    // alert("Form submitted successfully!");
    // navigate("/");
  };

  const isRental = product.productType?.toLowerCase().includes("rental");
  const months = isRental ? product.months : 1;
  const basePrice = product.price * months;
  const gst = basePrice * 0.18;
  const total = basePrice + gst;

  return (
    <>

      <div className="fixed inset-0 bg-gray-100 overflow-auto p-4 sm:p-10 z-50">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg flex flex-col lg:flex-row overflow-hidden">
          {/* Left Side: Billing Info */}
          <div className="w-full lg:w-2/3 p-6 sm:p-10 relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing Information</h2>

            <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  name="orgName"
                  placeholder="Enter organisation name"
                  value={formData.orgName}
                  onChange={handleChange}
                  required
                />
                <InputField
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <InputField
                  name="mobile"
                  placeholder="Enter your mobile number"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
                <InputField
                  name="pinCode"
                  placeholder="6-digit area pin code"
                  value={formData.pinCode}
                  onChange={handleChange}
                  required
                />
                <InputField
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <InputField
                  name="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />


                {/* GST */}
                <div className="sm:col-span-2">
                  {/* <label className="block font-medium mb-1">GSTIN</label> */}
                  <div className="flex items-center gap-2 mb-4 w-[80%] ">
                    <input
                      type="checkbox"
                      name="noGstin"
                      checked={formData.noGstin}
                      onChange={handleChange}
                      className="w-[10%] focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600 w-[60%]">I do not have GSTIN</span>
                  </div>
                  <input
                    type="text"
                    name="gstin"
                    disabled={formData.noGstin}
                    placeholder="Enter GSTIN Number"
                    value={formData.gstin}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                {/* <label className="block font-medium mb-1">Billing Address</label> */}
                <textarea
                  name="address"
                  required
                  placeholder="This address will appear on your invoice"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              {/* Policy Agreements */}
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2 w-[100%]">
                  <input
                    type="checkbox"
                    name="agreePolicy"
                    checked={formData.agreePolicy}
                    onChange={handleChange}
                    className="w-[5%] focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="w-[80%]">
                    I agree with the{" "}
                    <a href="#" className="text-blue-600 underline">Delivery</a>,{" "}
                    <a href="#" className="text-blue-600 underline">Cancellation</a>,{" "}
                    <a href="#" className="text-blue-600 underline">Refund</a> and{" "}
                    <a href="#" className="text-blue-600 underline">Privacy</a> policies.
                  </span>
                </div>
                <div className="flex items-center gap-2 w-[80%]">
                  <input
                    type="checkbox"
                    name="agreeWhatsApp"
                    checked={formData.agreeWhatsApp}
                    onChange={handleChange}
                    className=" w-[5%] focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="w-[70%]">I agree to receive updates on WhatsApp</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-3 gap-5 flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/pricing")}
                  className="bg-gray-300 text-gray-700 px-4 py-3 rounded-lg shadow hover:bg-gray-400 transition"
                >
                  Back to Pricing
                </button>
                <button
                  type="submit"
                  className="bg-yellow-600 text-white px-4 py-3 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Product Info */}
          <div className="w-full lg:w-1/3 bg-blue-50 p-6 sm:p-8 border-l border-gray-200">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Order Summary</h3>
            <div className="bg-white shadow rounded-xl p-5 space-y-4 text-gray-700">
              <InfoRow label="Product" value={product.name +` `+ product.productType} />
              <InfoRow label="Edition" value={product.userEdition} />
              {isRental && (
                <InfoRow label="Duration" value={`${months} Month${months > 1 ? "s" : ""}`} />
              )}
              <hr />
              <InfoRow label="Base Price" value={`₹${basePrice.toFixed(2)}`} />
              <InfoRow label="GST (18%)" value={`₹${gst.toFixed(2)}`} />
              <div className="text-lg font-semibold text-blue-700 border-t pt-4 flex justify-between">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <br></br>
              <label className="block font-medium mb-2">Select Payment Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["upi", "card", "netbanking"].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center border p-3 rounded-lg cursor-pointer transition ${formData.paymentMethod === method
                      ? "bg-blue-100 border-blue-500"
                      : "hover:border-blue-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {method === "upi" && "UPI"}
                    {method === "card" && "Credit/Debit Card"}
                    {method === "netbanking" && "Net Banking"}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {paymentPopupOpen && (

        <PaymentPopup
          isOpen={paymentPopupOpen}
          onClose={handleClosePayment}
          product={product} 
          buyerinfo={formData}
        />
      )};

    </>

  );

  function InfoRow({ label, value }) {
    return (
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span>{value}</span>
      </div>
    );
  }




};

export default BillingInfoPage;
