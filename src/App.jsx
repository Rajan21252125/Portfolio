// src/App.jsx
/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* -- Public Components -- */
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Skills from "./component/Skills";
import Project from "./component/Project";
import Footer from "./component/Footer";

/* -- Admin Lazy Components -- */
const AdminLayout = React.lazy(() => import("./admin/components/AdminLayout"));
const AdminDashboard = React.lazy(() => import("./admin/pages/Dashboard"));
const AdminProjects = React.lazy(() => import("./admin/pages/Projects"));
const AdminEditProjects = React.lazy(() => import("./admin/pages/ProjectEdit"));
const AdminProjectCreate = React.lazy(() => import("./admin/pages/ProjectCreate"));
const AdminProfile = React.lazy(() => import("./admin/pages/Profile"));
const AdminProfileEdit = React.lazy(() => import("./admin/pages/ProfileEdit"));
const AdminPending = React.lazy(() => import("./admin/pages/AdminPending"));
const AdminLogin = React.lazy(() => import("./admin/pages/Login"));

/* -- Auth & Protection -- */
import { AuthProvider } from "./contexts/AuthContext";
import RequireAdmin from "./component/RequireAdmin";
import Loading from "./admin/components/Loading";

/* Public Home Layout */
function PublicHome() {
  return (
    <div className="bg-green-100">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Project />
      </main>
      <Footer />
    </div>
  );
}

/* Suspense wrapper for lazy pages */
function SuspenseWrapper({ children }) {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loading />
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* --- PUBLIC ROUTE --- */}
          <Route path="/" element={<PublicHome />} />

          {/* --- LOGIN --- */}
          <Route
            path="/login"
            element={
              <SuspenseWrapper>
                <AdminLogin />
              </SuspenseWrapper>
            }
          />

          {/* --- ADMIN ROUTES (protected) --- */}
          <Route
            path="/admin/*"
            element={
              <RequireAdmin>
                <SuspenseWrapper>
                  <AdminLayout />
                </SuspenseWrapper>
              </RequireAdmin>
            }
          >
            <Route
              index
              element={
                <SuspenseWrapper>
                  <AdminDashboard />
                </SuspenseWrapper>
              }
            />

            <Route
              path="projects"
              element={
                <SuspenseWrapper>
                  <AdminProjects />
                </SuspenseWrapper>
              }
            />

            <Route
              path="projects/create"
              element={
                <SuspenseWrapper>
                  <AdminProjectCreate />
                </SuspenseWrapper>
              }
            />

            <Route
              path="projects/edit/:id"
              element={
                <SuspenseWrapper>
                  <AdminEditProjects />
                </SuspenseWrapper>
              }
            />

            <Route
              path="profile"
              element={
                <SuspenseWrapper>
                  <AdminProfile />
                </SuspenseWrapper>
              }
            />

            <Route
              path="profile/edit"
              element={
                <SuspenseWrapper>
                  <AdminProfileEdit />
                </SuspenseWrapper>
              }
            />

            <Route
              path="pending"
              element={
                <SuspenseWrapper>
                  <AdminPending />
                </SuspenseWrapper>
              }
            />
          </Route>

          {/* fallback → home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
