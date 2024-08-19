import React from "react";
import { Route, Routes } from "react-router-dom";
import BellList from "../components/BellList";
import BellFormPage from "../components/BellForm";
import UserList from "../components/UserList";
import RegisterPage from "../components/RegisterPage";
import UserFormPage from "../components/UserForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/bells" element={<BellList />} />
      <Route path="/bell/add" element={<BellFormPage />} />
      <Route path="/bell/:id/edit" element={<BellFormPage />} />

      <Route path="/users" element={<UserList />} />
      <Route path="/user/add" element={<UserFormPage />} />
      <Route path="/bell/:id/edit" element={<UserFormPage />} />

      <Route
        path="/"
        element={<div>Welcome to the Bell Management System</div>}
      />
    </Routes>
  );
};

export default AppRoutes;
