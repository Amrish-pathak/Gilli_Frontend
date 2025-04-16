import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firestore';
import { IoCloseCircleSharp } from 'react-icons/io5';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    botusername: "",
    bottoken: "",
    channel1: "",
    channel2: "",
    welcomespin: 0,
    referspin: 0,
    minimumwithdrawa: 1000
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  // Fetch settings from Firestore
  const fetchSettings = async () => {
    try {
      const docRef = doc(db, "settings", "U3bDWwUlEqhVLJ6U3xrm"); 
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSettings(docSnap.data()); // ✅ Load data into inputs
      } else {
        console.log("No document found, using default settings.");
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
      setError("Failed to fetch settings. Please try again.");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: ["welcomespin", "referspin", "minimumwithdrawa"].includes(name)
        ? value === "" ? "" : Number(value)  // Ensure numeric values
        : value,
    }));
  };

  // Update or create document in Firestore
  const handleUpdateSettings = async () => {
    try {
      const docRef = doc(db, "settings", "U3bDWwUlEqhVLJ6U3xrm"); 
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, settings);  // ✅ Update document if exists
      } else {
        await setDoc(docRef, settings);  // ✅ Create document if missing
      }
      
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Error updating document:", err);
      setError("Failed to update settings. Please try again.");
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div id='refer' className="w-full flex flex-col space-y-4 h-[100vh] scroller pt-4 overflow-y-auto pb-[150px]">
      <h1 className="text-[20px] font-semibold mb-1">Bot Complete Setting</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex w-full flex-wrap gap-3">
        <InputField label="Bot Username" name="botusername" value={settings.botusername} onChange={handleInputChange} />
        <InputField label="Bot Token" name="bottoken" value={settings.bottoken} onChange={handleInputChange} />
      </div>

      <div className="flex w-full flex-wrap gap-3">
        <InputField label="Channel 1" name="channel1" value={settings.channel1} onChange={handleInputChange} />
        <InputField label="Channel 2" name="channel2" value={settings.channel2} onChange={handleInputChange} />
      </div>

      <div className="flex w-full flex-wrap gap-3">
        <InputField label="Welcome Spins" name="welcomespin" type="number" value={settings.welcomespin} onChange={handleInputChange} />
        <InputField label="Refer Spins" name="referspin" type="number" value={settings.referspin} onChange={handleInputChange} />
      </div>

      <div className="flex w-full flex-wrap gap-3">
        <InputField label="Minimum Withdrawal" name="minimumwithdrawa" type="number" value={settings.minimumwithdrawa} onChange={handleInputChange} />
      </div>

      <button 
        onClick={handleUpdateSettings} 
        className="bg-green-500 font-semibold text-[15px] rounded-[6px] w-[50%] sm:w-[200px] h-fit px-4 py-3 text-[#fff]">
        Update Settings
      </button>

      {showSuccessModal && (
        <SuccessModal message="Settings have been updated successfully." onClose={closeModal} />
      )}
    </div>
  );
};

// Reusable Input Component
const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div className='flex flex-col w-full sm:w-[49%] gap-1'>
    <label className='text-[15px] pl-1 pb-[2px] font-medium text-blue-900'>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label}`}
      className="bg-[#4b4b4b] placeholder:text-[#ffffff] text-[#e0e0e0] placeholder:text-[12px] text-[13px] placeholder:font-light h-[55px] border-none outline-none rounded-[10px] flex items-center px-6"
    />
  </div>
);

// Success Modal Component
const SuccessModal = ({ message, onClose }) => (
  <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div 
      className="modal-container bg-[#595D65] w-11/12 md:max-w-md mx-auto rounded-[10px] shadow-lg z-50 overflow-y-auto"
      role="dialog" aria-modal="true" aria-labelledby="success-title">
      
      <div className="modal-content py-4 text-left px-6">
        <div className="flex justify-end items-center pb-3">
          <button className="modal-close cursor-pointer z-50" onClick={onClose} aria-label="Close">
            <IoCloseCircleSharp size={32} className='text-secondary' />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <p id="success-title" className='text-white'>{message}</p>
        </div>
        <div className="flex justify-center pt-2">
          <button className="modal-close bg-blue-500 text-white p-2 px-6 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AdminSettings;
