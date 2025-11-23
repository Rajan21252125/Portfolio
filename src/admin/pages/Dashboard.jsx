// src/admin/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const API_BASE = import.meta.env.VITE_API_BASE || "";
const LOGO = "../../public/icons8-portfolio-48.png";

export default function Dashboard() {
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  async function loadStats() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/admin/stats`, {
        credentials: "include",
      });
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    loadStats();
  }, []);

  if (loading) return <Loading fullscreen />;

  return (
    <div className="bg-green-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img src={LOGO} className="w-14 h-14 rounded-lg" />
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">
              Manage portfolio content & users
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-600">Total Projects</h3>
            <div className="text-3xl font-bold mt-2">
              {stats?.totalProjects ?? 0}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-600">Pending Users</h3>
            <div className="text-3xl font-bold mt-2 text-yellow-600">
              {stats?.pendingUsers ?? 0}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-600">Approved Users</h3>
            <div className="text-3xl font-bold mt-2 text-green-600">
              {stats?.approvedUsers ?? 0}
            </div>
          </div>

        </div>

        {/* Quick actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <Link to="/admin/projects" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Manage Projects</h3>
            <p className="text-sm text-gray-600 mt-1">Add, edit & delete projects</p>
          </Link>

          <Link to="/admin/profile" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Profile</h3>
            <p className="text-sm text-gray-600 mt-1">View & update your details</p>
          </Link>

          <Link to="/admin/pending" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Pending Approvals</h3>
            <p className="text-sm text-gray-600 mt-1">Approve or reject new users</p>
          </Link>

        </div>

      </div>
    </div>
  );
}
