// src/admin/pages/Projects.jsx
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import ConfirmPopup from "../components/ConfirmPopup";

const API_BASE = import.meta.env.VITE_API_BASE || "";
// local uploaded logo (used as fallback thumbnail)
const FALLBACK_IMG = "/mnt/data/8ffc2624-e0d1-4ac2-837a-29a0c7700757.png";

export default function Projects() {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // confirm popup state
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmConfig, setConfirmConfig] = React.useState({});
  const [pendingAction, setPendingAction] = React.useState(null); // { type, projectId }

  async function fetchProjects() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/projects`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // open confirm popup with dynamic text
  function openConfirm({ title, message, confirmText = "Yes", cancelText = "No", onConfirm }) {
    setConfirmConfig({ title, message, confirmText, cancelText});
    setPendingAction(() => onConfirm);
    setConfirmOpen(true);
  }

  // delete project
  const handleDelete = (projectId, projectName) => {
    openConfirm({
      title: "Delete project",
      message: `Are you sure you want to permanently delete "${projectName}"? This cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        setConfirmOpen(false);
        try {
          // optimistic UI: mark deleting state
          setProjects((prev) => prev.map(p => p.id === projectId ? { ...p, deleting: true } : p));
          const res = await fetch(`${API_BASE}/projects/${projectId}`, {
            method: "DELETE",
            credentials: "include",
          });
          if (!res.ok) {
            const json = await res.json().catch(() => ({}));
            throw new Error(json.message || `Failed to delete (${res.status})`);
          }
          // remove from list
          setProjects((prev) => prev.filter((p) => p.id !== projectId));
        } catch (err) {
          console.error(err);
          setError(String(err));
          // clear deleting flag
          setProjects((prev) => prev.map(p => p.id === projectId ? { ...p, deleting: false } : p));
        }
      },
    });
  };

  // quick approve or publish action (example)
  const handleQuickToggle = (projectId, field = "published") => {
    openConfirm({
      title: "Toggle project state",
      message: `Toggle "${field}" for this project?`,
      confirmText: "Toggle",
      cancelText: "Cancel",
      onConfirm: async () => {
        setConfirmOpen(false);
        try {
          setProjects((prev) => prev.map(p => p.id === projectId ? { ...p, updating: true } : p));
          const res = await fetch(`${API_BASE}/projects/${projectId}/toggle-${field}`, {
            method: "POST",
            credentials: "include",
          });
          if (!res.ok) {
            const json = await res.json().catch(() => ({}));
            throw new Error(json.message || `Failed to toggle (${res.status})`);
          }
          // refresh projects to reflect accurate state
          await fetchProjects();
        } catch (err) {
          console.error(err);
          setError(String(err));
          setProjects((prev) => prev.map(p => p.id === projectId ? { ...p, updating: false } : p));
        }
      },
    });
  };

  if (loading) return <Loading fullscreen text="Loading projects..." />;

  return (
    <div className="min-h-screen bg-green-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:flex-row flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="text-sm text-gray-600">Manage your portfolio projects — add, edit or remove entries.</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
            <Link
              to="/admin/projects/create"
              className="px-4 py-2 bg-green-600 text-white rounded shadow-sm text-sm"
            >
              + Create Project
            </Link>
            <button
              onClick={fetchProjects}
              className="px-3 py-2 border rounded text-sm bg-white"
            >
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-100 rounded">
            {error}
          </div>
        )}

        {projects.length === 0 ? (
          <div className="bg-white rounded shadow p-6 text-center">
            <p className="text-gray-600">No projects found. Click <Link to="/admin/projects/create" className="underline text-royal-blue">Create Project</Link> to add your first project.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <article key={p.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
                <div className="h-44 bg-gray-100 flex items-center justify-center">
                  <img
                    src={p.image_url || p.imageUrl || FALLBACK_IMG}
                    alt={p.name}
                    className="object-cover w-full h-full"
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-lg">{p.name}</h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-3">{p.description || ""}</p>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      <div>{p.created_at ? new Date(p.created_at).toLocaleDateString() : ""}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {(p.tools || p.tools?.length) ? (p.tools.map((t, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-800 rounded">{t}</span>
                    ))) : null}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex gap-2">
                      {p.live_link && (
                        <a href={p.live_link} target="_blank" rel="noreferrer" className="text-sm px-2 py-1 border rounded text-royal-blue">
                          Live
                        </a>
                      )}
                      {p.github_url && (
                        <a href={p.github_url} target="_blank" rel="noreferrer" className="text-sm px-2 py-1 border rounded">
                          GitHub
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/projects/edit/${p.id}`}
                        className="text-sm px-3 py-1 bg-yellow-50 text-yellow-800 rounded border"
                        title="Edit"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={p.deleting}
                        className="text-sm px-3 py-1 bg-red-50 text-red-700 border rounded"
                        title="Delete"
                      >
                        {p.deleting ? "Deleting..." : "Delete"}
                      </button>

                      {/* optional quick toggle example (publish/unpublish) */}
                      <button
                        onClick={() => handleQuickToggle(p.id, "published")}
                        disabled={p.updating}
                        className="text-sm px-3 py-1 bg-royal-blue text-white rounded"
                        title="Toggle published"
                      >
                        {p.updating ? "Working..." : (p.published ? "Unpublish" : "Publish")}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* confirm popup instance */}
      <ConfirmPopup
        open={confirmOpen}
        config={confirmConfig}
        onConfirm={async () => {
          if (typeof pendingAction === "function") {
            await pendingAction();
            setPendingAction(null);
          }
        }}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingAction(null);
        }}
      />
    </div>
  );
}
