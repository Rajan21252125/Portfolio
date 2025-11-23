// src/admin/pages/ProjectEdit.jsx
import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import ConfirmPopup from "../components/ConfirmPopup";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  // file inputs
  const [imageFile, setImageFile] = React.useState(null);
  const [videoFile, setVideoFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);

  // confirm popup
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmConfig, setConfirmConfig] = React.useState({});
  const [pendingAction, setPendingAction] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/projects/${id}`, { credentials: "include" });
        if (!res.ok) {
          if (res.status === 404) throw new Error("Project not found");
          throw new Error("Failed to fetch project");
        }
        const data = await res.json();
        if (!mounted) return;
        setProject({
          name: data.name ?? "",
          description: data.description ?? "",
          tools: Array.isArray(data.tools) ? data.tools : (data.tools ? data.tools.split(",").map(s => s.trim()) : []),
          liveLink: data.live_link ?? "",
          githubUrl: data.github_url ?? "",
          image_url: data.image_url ?? null,
          video_url: data.video_url ?? null,
          published: !!data.published,
        });
        setImagePreview(data.image_url ?? null);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError(String(err));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  function setCommaArray(field, value) {
    const arr =
      typeof value === "string"
        ? value.split(",").map((s) => s.trim()).filter(Boolean)
        : Array.isArray(value) ? value : [];
    setProject((p) => ({ ...p, [field]: arr }));
  }

  function handleFileChange(e, kind) {
    const file = e.target.files?.[0] ?? null;
    if (kind === "image") {
      setImageFile(file);
      if (file) {
        const url = URL.createObjectURL(file);
        setImagePreview(url);
      } else {
        setImagePreview(project?.image_url ?? null);
      }
    } else if (kind === "video") {
      setVideoFile(file);
    }
  }

  function openConfirm({ title, message, confirmText = "Yes", cancelText = "No", onConfirm }) {
    setConfirmConfig({ title, message, confirmText, cancelText });
    setPendingAction(() => onConfirm);
    setConfirmOpen(true);
  }

  async function handleSave(e) {
    e?.preventDefault();
    openConfirm({
      title: "Save project changes?",
      message: "Do you want to save the edits to this project?",
      confirmText: "Save",
      cancelText: "Cancel",
      onConfirm: async () => {
        setConfirmOpen(false);
        setSaving(true);
        setError(null);
        try {
          const body = new FormData();
          body.append("name", project.name || "");
          body.append("description", project.description || "");
          body.append("tools", JSON.stringify(project.tools || []));
          body.append("live_link", project.liveLink || "");
          body.append("github_url", project.githubUrl || "");
          if (imageFile) body.append("image", imageFile);
          if (videoFile) body.append("video", videoFile);
          body.append("published", project.published ? "1" : "0");

          const res = await fetch(`${API_BASE}/projects/${id}`, {
            method: "PUT",
            credentials: "include",
            body,
          });

          if (!res.ok) {
            const json = await res.json().catch(() => ({}));
            throw new Error(json.message || `Failed to save (${res.status})`);
          }

          const updated = await res.json();
          setSuccess("Project saved");
          // update local state
          setProject((p) => ({
            ...p,
            image_url: updated.image_url ?? p.image_url,
            video_url: updated.video_url ?? p.video_url,
          }));
          // release object URLs if created
          if (imageFile) { URL.revokeObjectURL(imagePreview); setImageFile(null); }
          if (videoFile) setVideoFile(null);

          setTimeout(() => {
            navigate("/admin/projects");
          }, 800);
        } catch (err) {
          console.error(err);
          setError(String(err));
        } finally {
          setSaving(false);
        }
      },
    });
  }

  const handleDelete = () => {
    openConfirm({
      title: "Delete project",
      message: "Are you sure you want to permanently delete this project? This cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        setConfirmOpen(false);
        setSaving(true);
        try {
          const res = await fetch(`${API_BASE}/projects/${id}`, {
            method: "DELETE",
            credentials: "include",
          });
          if (!res.ok) {
            const json = await res.json().catch(() => ({}));
            throw new Error(json.message || `Failed to delete (${res.status})`);
          }
          navigate("/admin/projects");
        } catch (err) {
          console.error(err);
          setError(String(err));
        } finally {
          setSaving(false);
        }
      },
    });
  };

  if (loading) return <Loading fullscreen text="Loading project..." />;

  if (error) {
    return (
      <div className="bg-green-100 p-6 min-h-screen flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-red-600">Failed to load project</h2>
          <p className="mt-2 text-sm text-gray-600">Error: {error}</p>
          <div className="mt-4 flex gap-3">
            <button onClick={() => window.history.back()} className="px-4 py-2 border rounded">Back</button>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-royal-blue text-white rounded">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-green-100 p-6 min-h-screen flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Project not found</h2>
          <p className="mt-2 text-sm text-gray-600">This project couldn't be loaded.</p>
          <div className="mt-4">
            <Link to="/admin/projects" className="px-4 py-2 bg-royal-blue text-white rounded">Back to projects</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Edit Project</h1>
            <p className="text-sm text-gray-600">Update project details, upload media, or remove the project.</p>
          </div>

          <div className="flex gap-2">
            <Link to="/admin/projects" className="px-3 py-2 border rounded text-sm bg-white">Back</Link>
            <button
              onClick={handleDelete}
              className="px-3 py-2 bg-red-50 text-red-700 border rounded text-sm"
              disabled={saving}
            >
              Delete
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded text-sm"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className="p-2 border rounded w-full"
                placeholder="Project name"
                value={project.name}
                onChange={(e) => setProject((p) => ({ ...p, name: e.target.value }))}
                required
              />
              <input
                className="p-2 border rounded w-full"
                placeholder="Live link"
                value={project.liveLink}
                onChange={(e) => setProject((p) => ({ ...p, liveLink: e.target.value }))}
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Description</label>
              <textarea
                className="w-full p-2 border rounded min-h-[120px]"
                placeholder="Project description"
                value={project.description}
                onChange={(e) => setProject((p) => ({ ...p, description: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-700">Tools (comma separated)</label>
                <input
                  className="p-2 border rounded w-full"
                  placeholder="React, Node, Tailwind"
                  value={(project.tools || []).join(", ")}
                  onChange={(e) => setCommaArray("tools", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">GitHub URL</label>
                <input
                  className="p-2 border rounded w-full"
                  placeholder="https://github.com/..."
                  value={project.githubUrl}
                  onChange={(e) => setProject((p) => ({ ...p, githubUrl: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Image</label>
                <div className="mt-2 flex gap-3 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "image")}
                  />
                  <div className="text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(project.image_url ?? null);
                      }}
                      className="text-sm underline"
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <img src={imagePreview} alt="preview" className="w-full max-w-xs h-44 object-cover rounded border" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Video (optional)</label>
                <div className="mt-2">
                  <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, "video")} />
                </div>
                {project.video_url && !videoFile && (
                  <div className="mt-3 text-sm text-gray-600">
                    Existing video: <a href={project.video_url} target="_blank" rel="noreferrer" className="underline text-royal-blue">View</a>
                  </div>
                )}
                {videoFile && (
                  <div className="mt-3 text-sm text-gray-600">New video selected: {videoFile.name}</div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={project.published} onChange={(e) => setProject((p) => ({ ...p, published: e.target.checked }))} />
                <span className="text-sm text-gray-700">Published</span>
              </label>

              <div className="ml-auto text-sm text-gray-500">
                Created: {project.created_at ? new Date(project.created_at).toLocaleString() : "—"}
              </div>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}
            {success && <div className="text-sm text-green-700">{success}</div>}
          </form>
        </div>
      </div>

      {/* Confirm popup */}
      <ConfirmPopup
        open={confirmOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText={confirmConfig.confirmText}
        cancelText={confirmConfig.cancelText}
        onConfirm={async () => {
          if (typeof pendingAction === "function") {
            await pendingAction();
            setPendingAction(null);
            setConfirmOpen(false);
          }
        }}
        onCancel={() => { setConfirmOpen(false); setPendingAction(null); }}
      />

      {saving && <Loading fullscreen text="Processing..." />}
    </div>
  );
}
