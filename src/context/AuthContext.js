import React, { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://gullibackend.onrender.com/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token in request
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Invalid token");

        const data = await response.json();
        setUser(data); // ✅ Update user state
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("authToken"); // ✅ Remove token if invalid
      } finally {
        setLoading(false);
      }
    };

    fetchUser(); // ✅ Fetch user on mount
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("authToken", token); // ✅ Save token
    setUser(userData); // ✅ Update user state
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // ✅ Remove token on logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
