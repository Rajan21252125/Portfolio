// src/App.jsx
/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* -- public portfolio components (your existing ones) -- */
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
// import About from './component/About';
import Skills from "./component/Skills";
import Project from "./component/Project";
import Footer from "./component/Footer";

/* -- admin components & pages (lazy-loaded) -- */
const AdminLayout = React.lazy(() => import("./admin/components/AdminLayout"));
const AdminDashboard = React.lazy(() => import("./admin/pages/Dashboard"));
const AdminProjects = React.lazy(() => import("./admin/pages/Projects"));
const AdminEditProjects = React.lazy(() => import("./admin/pages/ProjectEdit"));
const AdminProjectCreate = React.lazy(() => import("./admin/pages/ProjectCreate"));
const AdminProfile = React.lazy(() => import("./admin/pages/Profile"));
const AdminProfileEdit = React.lazy(() => import("./admin/pages/ProfileEdit"));
const AdminPending = React.lazy(() => import("./admin/pages/AdminPending"));
const AdminLogin = React.lazy(() => import("./admin/pages/Login"));

/* -- AuthContext & guard -- */
import { AuthProvider } from "./contexts/AuthContext";
import RequireAdmin from "./component/RequireAdmin";
import Loading from "./admin/components/Loading";
import ProjectEdit from "./admin/pages/ProjectEdit";

/* Public portfolio root (unchanged) */
function PublicHome() {
  return (
    <div className="bg-green-100">
      {/* Navigation */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main>
        <Hero />
        {/* <About /> */}
        <Skills />
        <Project />
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

/* Fallback loading UI for lazy pages */
function SuspenseWrapper({ children }) {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <Loading />
    </div>}>
      {children}
    </React.Suspense>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* public portfolio stays at / */}
          <Route path="/" element={<PublicHome />} />

          {/* login page (public) - after success it should redirect to /admin */}
          <Route
            path="/login"
            element={
              <SuspenseWrapper>
                <AdminLogin />
              </SuspenseWrapper>
            }
          />

          {/* Admin area: protected client-side with RequireAdmin.
              All admin pages start with /admin/* so your portfolio routes won't collide. */}
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
            {/* nested admin routes inside AdminLayout via react-router Outlet */}
            <Route index element={<SuspenseWrapper><AdminDashboard /></SuspenseWrapper>} />
            <Route path="projects" element={<SuspenseWrapper><AdminProjects /></SuspenseWrapper>} />
            <Route path="projects/create" element={<SuspenseWrapper><AdminProjectCreate /></SuspenseWrapper>} />
            <Route path="projects/edit/:id" element={<SuspenseWrapper><AdminEditProjects /></SuspenseWrapper>} />
            <Route path="profile" element={<SuspenseWrapper><AdminProfile /></SuspenseWrapper>} />
            <Route path="profile/edit" element={<SuspenseWrapper><AdminProfileEdit /></SuspenseWrapper>} />
            <Route path="pending" element={<SuspenseWrapper><AdminPending /></SuspenseWrapper>} />
          </Route>

          {/* fallback: unknown routes -> public home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
