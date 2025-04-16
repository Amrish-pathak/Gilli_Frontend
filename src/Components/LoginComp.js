import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import FormControls from "./FormControl";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCheckmarkCircle, IoWarningOutline } from "react-icons/io5";

const LoginComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const { login } = useAuthContext(); // Use auth context
  const navigate = useNavigate();

  const handleForm = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setMessage({ type: "error", text: "Please enter both email and password." });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch("https://gullibackend.onrender.com/admin/owner/login2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      login(data.user, data.token);
  
      setMessage({ type: "success", text: "Login successful! Redirecting..." });
  
      setTimeout(() => {
        navigate("/dashboardAdx/stats", { replace: true });
      }, 2000);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper flex flex-col items-start">
      <div className="w-full text-center pb-4 flex flex-col items-center">
        <img src="stars.svg" alt="Logo" className="w-[100px]" />
        <h1 className="text-[24px] sm:text-[28px] font-medium pb-1">Admin Dashboard</h1>
        <p className="text-[#b0b0b0] text-[14px] sm:text-[13px] font-light">
          Enter your email and password to login
        </p>
      </div>

      <div className="w-full flex flex-col items-center space-y-3 sm:space-y-4">
        <FormControls label="Email" type="email" id="email" placeholder="Your email" value={email} setValue={setEmail} />
        <FormControls label="Password" type="password" id="password" placeholder="**********" value={password} setValue={setPassword} />

        <div className="flex flex-col items-center w-full">
          <button
            className="bg-[#ffffff] uppercase hover:bg-[#c2fa7c] w-full ease-in duration-300 text-[#000] text-[15px] font-medium h-[50px] rounded-[12px] flex items-center justify-center"
            onClick={handleForm}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                Logging in <AiOutlineLoading3Quarters size={18} className="animate-spin ml-[12px]" />
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`fixed top-6 left-0 right-0 px-4 w-full z-[60] ${message.type === "error" ? "text-[#ff4d4d]" : "text-[#4dff4d]"}`}>
          <div className="flex items-center space-x-2 px-4 bg-[#121620ef] h-[50px] rounded-[8px]">
            {message.type === "error" ? <IoWarningOutline size={16} /> : <IoCheckmarkCircle size={16} />}
            <span className="text-[15px]">{message.text}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginComp;
