import React, { useState } from "react";
import EmployeeManager from "../../Components/EmployeeManager";

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState("basic");

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return <BasicInfo />;
      case "payment":
        return <PaymentInfo />;
      case "employees":
        return <EmployeeManager/>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Company Profile</h1>

      {/* Tabs Header */}
      <div className="flex space-x-4 border-b pb-2">
        <TabButton label="Basic Info" active={activeTab === "basic"} onClick={() => setActiveTab("basic")} />
        <TabButton label="Payment Info" active={activeTab === "payment"} onClick={() => setActiveTab("payment")} />
        <TabButton label="Employee Info" active={activeTab === "employees"} onClick={() => setActiveTab("employees")} />
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded-xl shadow">{renderTabContent()}</div>
    </div>
  );
};

const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-t-lg font-medium ${
      active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {label}
  </button>
);

const BasicInfo = () => (
  <div className="space-y-2">
    <p><strong>Company Name:</strong> Gulli Tech</p>
    <p><strong>Founded:</strong> 2020</p>
    <p><strong>Address:</strong> 123 Main St, Satna, MP</p>
    <p><strong>Contact:</strong> contact@gullitech.com</p>
  </div>
);

const PaymentInfo = () => (
  <div className="space-y-2">
    <p><strong>GST Number:</strong> 09XXXXXXXXXX1Z5</p>
    <p><strong>UPI ID:</strong> gulli@ybl</p>
    <p><strong>Bank Account:</strong> Gulli Tech Pvt Ltd, SBI XXXXXXXX1548</p>
  </div>
);

const EmployeeInfo = () => (
  <div className="space-y-2">
    <p><strong>Total Employees:</strong> 12</p>
    <p><strong>HR Contact:</strong> hr@gullitech.com</p>
    <p><strong>Departments:</strong> Admin, Development, Support</p>
  </div>
);

export default CompanyProfile;
