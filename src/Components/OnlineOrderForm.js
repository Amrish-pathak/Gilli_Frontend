import React, { useState } from "react";

const OnlineOrderForm = () => {
  const [formData, setFormData] = useState({
    strName: "",
    strName1: "",
    strEmail: "",
    strPinCode: "",
    strState: "",
    strCity: "",
    strGSTIN: "",
    strContactNumber: "",
    strAddress: "",
    privacyPolicy: false,
    whatsappChecked: true,
    noGSTIN: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // TODO: Add actual submission logic
  };

  return (
    <div className="container-fluid">
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <input type="hidden" name="strHdnCountry" value="1" />

        <div className="row pb-3">
          {/* Left - Billing & Form */}
          <div className="col-lg-8 mb-3">
            <div className="container bg-light rounded p-4">
              <h4 className="text-primary mb-3">Billing and Order Review</h4>
              <h5>Billing Details</h5>

              {/* Name */}
              <div className="mb-4">
                <label>Name</label>
                <input type="text" className="form-control" name="strName" value={formData.strName} onChange={handleChange} required />
              </div>

              {/* Organisation */}
              <div className="mb-4">
                <label>Organisation Name</label>
                <input type="text" className="form-control" name="strName1" value={formData.strName1} onChange={handleChange} required />
              </div>

              {/* Email & Pin */}
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label>Email</label>
                  <input type="email" className="form-control" name="strEmail" value={formData.strEmail} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-4">
                  <label>Area Pin Code</label>
                  <input type="text" className="form-control" name="strPinCode" value={formData.strPinCode} onChange={handleChange} maxLength="6" required />
                </div>
              </div>

              {/* State & City */}
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label>State</label>
                  <input type="text" className="form-control" name="strState" value={formData.strState} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-4">
                  <label>City</label>
                  <input type="text" className="form-control" name="strCity" value={formData.strCity} onChange={handleChange} required />
                </div>
              </div>

              {/* GSTIN & Mobile */}
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <label>GSTIN No.</label>
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" name="noGSTIN" checked={formData.noGSTIN} onChange={handleChange} />
                      <label className="form-check-label">I do not have GSTIN</label>
                    </div>
                  </div>
                  <input type="text" className="form-control" name="strGSTIN" value={formData.strGSTIN} onChange={handleChange} maxLength="15" />
                </div>
                <div className="col-md-6 mb-4">
                  <label>Mobile No.</label>
                  <input type="text" className="form-control" name="strContactNumber" value={formData.strContactNumber} onChange={handleChange} maxLength="10" />
                </div>
              </div>

              {/* Address */}
              <div className="mb-4">
                <label>Address</label>
                <textarea className="form-control" name="strAddress" rows="3" value={formData.strAddress} onChange={handleChange} maxLength="225" required />
              </div>

              {/* Policies */}
              <div className="form-check mb-2">
                <input type="checkbox" className="form-check-input" name="privacyPolicy" checked={formData.privacyPolicy} onChange={handleChange} required />
                <label className="form-check-label">
                  I agree with the{" "}
                  <a href="/tallyweb/modules/sd/docmgmt/policies.php" target="_blank" rel="noreferrer">
                    Delivery, Cancellation, Refund, and Privacy policies
                  </a>.
                </label>
              </div>

              <div className="form-check mb-4">
                <input type="checkbox" className="form-check-input" name="whatsappChecked" checked={formData.whatsappChecked} onChange={handleChange} />
                <label className="form-check-label">
                  I agree to receive communications through WhatsApp
                </label>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-end gap-3">
                <button type="button" className="btn btn-light" onClick={() => window.history.back()}>
                  Back to Pricing
                </button>
                <button type="submit" className="btn btn-warning text-white">
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="col-lg-4 mb-3">
            <div className="container bg-light rounded p-4">
              <h4 className="mb-4">Order Summary</h4>
              <h5 id="strProductName" className="fw-bold">[Product Name]</h5>

              <div className="d-flex justify-content-between mt-3">
                <span>INR</span>
                <span id="base_price" className="fw-bold fs-4 text-primary">[Base Price]</span>
              </div>

              <div className="text-end text-muted">(Exclusive of GST)</div>

              <hr className="my-3" />

              <div className="d-flex justify-content-between">
                <span>Sub Total</span>
                <span id="productSubTotal">[Sub Total]</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>GST (18%)</span>
                <span id="gstAmount">[GST]</span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-5 mt-2">
                <span>Total</span>
                <span id="productTotal">[Total]</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OnlineOrderForm;
