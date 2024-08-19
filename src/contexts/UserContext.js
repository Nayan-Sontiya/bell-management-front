// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from "react";

// Create a context for the user
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store the user

  useEffect(() => {
    // Check if the user is already logged in (e.g., check localStorage)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    // Set the user and token in localStorage
    console.log("userData  => ", userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData); // Update the user state
  };

  const logout = () => {
    // Clear user and token from localStorage and state
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
