// src/admin/index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectCreate from "./pages/ProjectCreate";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import AdminPending from "./pages/AdminPending";

function AppAdmin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protect admin routes with client-side check — backend must also protect */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/create" element={<ProjectCreate />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<ProfileEdit />} />
          <Route path="pending" element={<AdminPending />} />
          {/* fallback */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* Optional root redirect: keep your public homepage at /, so we redirect /admin root to login if not authenticated */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// Mount only if this file is the app entry; if you integrate into existing app, import AppAdmin into your main router.
// const root = document.getElementById("root-admin");
// if (root) {
//   createRoot(root).render(<AppAdmin />);
// }

export default AppAdmin;
