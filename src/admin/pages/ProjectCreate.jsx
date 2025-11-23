// src/admin/pages/ProjectCreate.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../components/Loading";
import ConfirmPopup from "../components/ConfirmPopup";

const API_BASE = import.meta.env.VITE_API_BASE || "";
// dev fallback image (uploaded asset) — tool will convert this local path to a URL in your environment
const FALLBACK_IMG = "/mnt/data/8ffc2624-e0d1-4ac2-837a-29a0c7700757.png";

export default function ProjectCreate() {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    name: "",
    description: "",
    tools: "",
    liveLink: "",
    githubUrl: "",
    published: false,
  });

  const [imageFile, setImageFile] = React.useState(null);
  const [videoFile, setVideoFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);

  const [submitting, setSubmitting] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // small UI usage if needed
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  // confirm popup state
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmConfig, setConfirmConfig] = React.useState({});
  const [pendingAction, setPendingAction] = React.useState(null);

  // handle image selection and preview
  function handleImageChange(e) {
    const f = e.target.files?.[0] ?? null;
    setImageFile(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  }

  // handle video selection
  function handleVideoChange(e) {
    const f = e.target.files?.[0] ?? null;
    setVideoFile(f);
  }

  function openConfirm({ title, message, confirmText = "Create", cancelText = "Cancel", onConfirm }) {
    setConfirmConfig({ title, message, confirmText, cancelText});
    setPendingAction(() => onConfirm);
    setConfirmOpen(true);
  }

  async function doCreate() {
    setConfirmOpen(false);
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // basic client-side validation
      if (!form.name.trim()) throw new Error("Project name is required");
      if (!form.description.trim()) throw new Error("Description is required");

      const body = new FormData();
      body.append("name", form.name.trim());
      body.append("description", form.description.trim());
      body.append("tools", JSON.stringify((form.tools || "").split(",").map(s => s.trim()).filter(Boolean)));
      body.append("liveLink", form.liveLink || "");
      body.append("githubUrl", form.githubUrl || "");
      body.append("published", form.published ? "1" : "0");

      if (imageFile) body.append("image", imageFile);
      if (videoFile) body.append("video", videoFile);

      const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        credentials: "include",
        body,
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || `Create failed (${res.status})`);
      }

      const created = await res.json();
      setSuccess("Project created successfully");
      // small delay so user sees success
      setTimeout(() => navigate("/admin/projects"), 800);
    } catch (err) {
      console.error(err);
      setError(String(err?.message || err));
    } finally {
      setSubmitting(false);
    }
  }

  // invoked when user clicks create button
  function handleSubmitClick(e) {
    e?.preventDefault();
    openConfirm({
      title: "Create project?",
      message: "This will add the project to your portfolio. Proceed?",
      confirmText: "Create",
      cancelText: "Cancel",
      onConfirm: doCreate,
    });
  }

  return (
    <div className="min-h-screen bg-green-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Create Project</h1>
            <p className="text-sm text-gray-600">Add a new project to your portfolio — include images, video and links.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/admin/projects" className="px-3 py-2 border rounded text-sm bg-white">Back</Link>
            <button
              onClick={handleSubmitClick}
              className="px-4 py-2 bg-green-600 text-white rounded shadow-sm text-sm"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Project"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmitClick(); }} className="space-y-4">
            {/* Name + Live link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className="p-2 border rounded w-full"
                placeholder="Project name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />

              <input
                className="p-2 border rounded w-full"
                placeholder="Live link (optional)"
                value={form.liveLink}
                onChange={(e) => setForm((f) => ({ ...f, liveLink: e.target.value }))}
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-700">Description</label>
              <textarea
                className="w-full p-2 border rounded min-h-[120px]"
                placeholder="Short project description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                required
              />
            </div>

            {/* Tools + GitHub */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className="p-2 border rounded w-full"
                placeholder="Tools (comma separated)"
                value={form.tools}
                onChange={(e) => setForm((f) => ({ ...f, tools: e.target.value }))}
              />
              <input
                className="p-2 border rounded w-full"
                placeholder="GitHub URL (optional)"
                value={form.githubUrl}
                onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))}
              />
            </div>

            {/* Media upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <div>
                <label className="text-sm text-gray-700">Image</label>
                <div className="mt-2 flex gap-3 items-center">
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                  <div className="text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(null); }}
                      className="text-sm underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <img
                    src={imagePreview || FALLBACK_IMG}
                    alt="preview"
                    className="w-full max-w-xs h-44 object-cover rounded border"
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Video (optional)</label>
                <div className="mt-2">
                  <input type="file" accept="video/*" onChange={handleVideoChange} />
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  {videoFile ? `Selected: ${videoFile.name}` : "No video selected"}
                </div>
              </div>
            </div>

            {/* Published toggle */}
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                />
                <span className="text-sm text-gray-700">Publish immediately</span>
              </label>
              <div className="ml-auto text-xs text-gray-500">Tip: Publish when ready to show on portfolio</div>
            </div>

            {/* error / success */}
            {error && <div className="text-sm text-red-600">{error}</div>}
            {success && <div className="text-sm text-green-700">{success}</div>}

            {/* actions (bottom) */}
            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={handleSubmitClick}
                disabled={submitting}
                className="px-4 py-2 bg-green-600 text-white rounded shadow-sm disabled:opacity-60"
              >
                {submitting ? "Creating..." : "Create Project"}
              </button>

              <Link to="/admin/projects" className="px-4 py-2 border rounded text-sm bg-white">Cancel</Link>

              <div className="ml-auto text-sm text-gray-500">{submitting ? "Working..." : "Ready to create"}</div>
            </div>
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
          } else {
            // fallback to doCreate if pendingAction not set
            await doCreate();
          }
        }}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingAction(null);
        }}
      />

      {/* show full screen loader while submitting */}
      {submitting && <Loading fullscreen text="Creating project..." />}
    </div>
  );
}
