import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AdminLayout from "./layouts/AdminLayout";
import AppRoutes from "./routes/AppRoutes";

import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { ToastContainer, toast } from "react-toastify";
import { UserProvider, UserContext } from "./contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [bells, setBells] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null); // User state to manage authentication

  // Example function to check user authentication status
  useEffect(() => {
    // Implement your authentication check logic here
    // For example, check token in local storage or make an API call
    const checkAuth = async () => {
      // Simulate checking authentication (replace with actual logic)
      const loggedInUser = localStorage.getItem("user"); // Example check
      setUser(loggedInUser ? JSON.parse(loggedInUser) : null);
    };
    checkAuth();
  }, []);

  const addBell = (bell) => {
    setBells([...bells, bell]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserProvider>
        <Router>
          <Routes>
            {/* Login route */}
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route
              path="/register"
              element={<RegisterPage setUser={setUser} />}
            />

            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AppRoutes />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </Router>
      </UserProvider>
    </LocalizationProvider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(UserContext);

  return user ? children : <LoginPage />;
};

export default App;
