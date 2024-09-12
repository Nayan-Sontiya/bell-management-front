import React from "react";
import { Route, Routes } from "react-router-dom";
import ScheduleList from "../components/ScheduleList";
import ScheduleFormPage from "../components/ScheduleFormPage";
import BellList from "../components/BellList";
import BellFormPage from "../components/BellForm";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Bell Routes */}
      <Route path="/bells" element={<BellList />} />
      <Route path="/bell/add" element={<BellFormPage />} />
      <Route path="/bell/:id/edit" element={<BellFormPage />} />

      {/* Schedule Routes */}
      <Route path="/schedules" element={<ScheduleList />} />
      <Route path="/schedule/add" element={<ScheduleFormPage />} />
      <Route path="/schedule/:id/edit" element={<ScheduleFormPage />} />

      {/* Default Route */}
      <Route
        path="/"
        element={<div>Welcome to the Bell and Schedule Management System</div>}
      />
    </Routes>
  );
};

export default AppRoutes;
