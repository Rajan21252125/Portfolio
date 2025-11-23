// src/admin/pages/ProfileEdit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ConfirmPopup from "../components/ConfirmPopup";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function ProfileEdit() {
  const [form, setForm] = React.useState({
    name: "",
    gmail: "",
    about: "",
    tech_stack: [],
    skills: [],
    roles: [],
    profile_picture_url: null,
    pdf_url: null,
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [profilePicFile, setProfilePicFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  const [removeProfilePic, setRemoveProfilePic] = useState(false);
  const [removeResume, setRemoveResume] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // function
  const [popupConfig, setPopupConfig] = useState(null);

  const navigate = useNavigate();

  // Load current profile
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const r = await fetch(`${API_BASE}/profile`, { credentials: "include" });
        if (!r.ok) {
          if (r.status === 404) {
            if (!mounted) return;
            setForm((f) => ({ ...f })); // empty
            setLoading(false);
            return;
          }
          throw new Error("Failed to fetch profile");
        }
        const data = await r.json();
        if (!mounted) return;
        // normalize arrays
        setForm({
          name: data.name ?? "",
          gmail: data.gmail ?? "",
          about: data.about ?? "",
          tech_stack: Array.isArray(data.tech_stack) ? data.tech_stack : [],
          skills: Array.isArray(data.skills) ? data.skills : [],
          roles: Array.isArray(data.roles) ? data.roles : [],
          profile_picture_url: data.profile_picture_url ?? null,
          pdf_url: data.pdf_url ?? null,
        });
        setProfilePicPreview(data.profile_picture_url ?? null);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setError(String(e));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  // Helpers to update tag arrays from a simple input (comma separated)
  function setCommaArray(field, value) {
    const arr =
      typeof value === "string"
        ? value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : Array.isArray(value)
        ? value
        : [];
    setForm((f) => ({ ...f, [field]: arr }));
  }

  function handleFileChange(e, kind) {
    const file = e.target.files?.[0] ?? null;
    if (kind === "profile") {
      setProfilePicFile(file);
      setRemoveProfilePic(false); // user added a new one => not removing
      if (file) {
        const url = URL.createObjectURL(file);
        setProfilePicPreview(url);
      } else {
        setProfilePicPreview(form.profile_picture_url || null);
      }
    } else if (kind === "resume") {
      setResumeFile(file);
      setRemoveResume(false);
    }
  }

  // ask confirmation before submit — opens popup
  function confirmSubmit() {
    setPopupConfig({
      title: "Save Changes?",
      message: "Do you want to save the changes to your profile?",
      confirmText: "Save",
      cancelText: "Cancel",
    });

    setConfirmAction(() => submit);
    setConfirmOpen(true);
  }

  // actual submit function (called after confirm)
  async function submit() {
    setConfirmOpen(false);
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const body = new FormData();

      // plain fields
      body.append("name", form.name || "");
      body.append("gmail", form.gmail || "");
      body.append("about", form.about || "");

      // arrays -> send as JSON strings (server should parse accordingly)
      body.append("tech_stack", JSON.stringify(form.tech_stack || []));
      body.append("skills", JSON.stringify(form.skills || []));
      body.append("roles", JSON.stringify(form.roles || []));

      // file uploads
      if (profilePicFile) body.append("profilePicture", profilePicFile);
      if (resumeFile) body.append("resume", resumeFile);

      // removal flags (if user wants to remove existing stored assets)
      if (removeProfilePic) body.append("removeProfilePicture", "1");
      if (removeResume) body.append("removeResume", "1");

      const res = await fetch(`${API_BASE}/profile`, {
        method: "PUT",
        credentials: "include",
        body,
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || `Failed to save (${res.status})`);
      }

      const data = await res.json();
      setSuccess("Profile saved successfully");
      // Update local state with response
      setForm((f) => ({
        ...f,
        profile_picture_url: data.profile_picture_url ?? f.profile_picture_url,
        pdf_url: data.pdf_url ?? f.pdf_url,
      }));
      setProfilePicFile(null);
      setResumeFile(null);
      setRemoveProfilePic(false);
      setRemoveResume(false);

      // small delay to let user see success and then navigate back
      setTimeout(() => {
        navigate("/admin/profile");
      }, 900);
    } catch (err) {
      console.error(err);
      setError(String(err));
    } finally {
      setSubmitting(false);
    }
  }

  function confirmCancel() {
    setPopupConfig({
      title: "Discard Changes?",
      message: "Your unsaved changes will be lost. Continue?",
      confirmText: "Discard",
      cancelText: "Keep Editing",
    });
    setConfirmAction(() => () => navigate("/admin/profile"));
    setConfirmOpen(true);
  }

  return (
    loading ? <Loading fullscreen text="Loading profile..." /> : <div className="min-h-screen bg-green-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start gap-4">
            <img
              src={profilePicPreview || ""}
              alt="avatar preview"
              className="w-20 h-20 object-contain rounded-md border"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <p className="text-sm text-gray-600 mt-1">
                Update your public profile information and resume.
              </p>
            </div>

            <div className="ml-auto flex flex-col gap-2">
              <button
                onClick={confirmSubmit}
                disabled={submitting}
                className="px-4 py-2 bg-blue-600 text-white rounded shadow-sm disabled:opacity-60"
              >
                {submitting ? "Saving..." : "Save changes"}
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 border rounded text-sm bg-white"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); confirmSubmit(); }}>
            {/* basic fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className="p-2 border rounded w-full"
                placeholder="Full name"
                value={form.name || ""}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                className="p-2 border rounded w-full"
                placeholder="Email (Gmail)"
                type="email"
                value={form.gmail || ""}
                onChange={(e) => setForm((f) => ({ ...f, gmail: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
              <textarea
                className="w-full p-2 border rounded min-h-[100px]"
                placeholder="Short bio / about you"
                value={form.about || ""}
                onChange={(e) => setForm((f) => ({ ...f, about: e.target.value }))}
              />
            </div>

            {/* tag inputs (comma separated) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-gray-700">Tech stack (comma separated)</label>
                <input
                  className="p-2 border rounded w-full"
                  placeholder="React, Node, Tailwind"
                  value={(form.tech_stack || []).join(", ")}
                  onChange={(e) => setCommaArray("tech_stack", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Skills (comma separated)</label>
                <input
                  className="p-2 border rounded w-full"
                  placeholder="JavaScript, Testing"
                  value={(form.skills || []).join(", ")}
                  onChange={(e) => setCommaArray("skills", e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Roles (comma separated)</label>
                <input
                  className="p-2 border rounded w-full"
                  placeholder="Frontend, DevOps"
                  value={(form.roles || []).join(", ")}
                  onChange={(e) => setCommaArray("roles", e.target.value)}
                />
              </div>
            </div>

            {/* files */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <div>
                <label className="text-sm text-gray-700">Profile picture</label>
                <div className="mt-2 flex gap-2 items-center">
                  <input
                    ref={(el) => {
                      // keep native file input ref behavior simple
                      if (el) el.onchange = (e) => handleFileChange(e, "profile");
                    }}
                    type="file"
                    accept="image/*"
                    className="text-sm"
                  />
                  <div className="text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() => {
                        // remove preview and set remove flag
                        setProfilePicFile(null);
                        setProfilePicPreview(null);
                        setRemoveProfilePic(true);
                      }}
                      className="text-sm text-red-600 "
                    >
                      Remove existing
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  {profilePicPreview ? (
                    <img src={profilePicPreview} alt="preview" className="w-28 h-28 object-contain rounded border" />
                  ) : (
                    <span>No profile picture</span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Resume (PDF)</label>
                <div className="mt-2 flex gap-2 items-center">
                  <input
                    ref={(el) => {
                      if (el) el.onchange = (e) => handleFileChange(e, "resume");
                    }}
                    type="file"
                    accept="application/pdf"
                    className="text-sm"
                  />
                  <div className="text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() => {
                        setResumeFile(null);
                        setRemoveResume(true);
                      }}
                      className="text-sm text-red-600"
                    >
                      Remove existing
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {form.pdf_url ? (
                    <a href={form.pdf_url} target="_blank" rel="noreferrer" className="underline text-royal-blue">
                      View uploaded resume
                    </a>
                  ) : (
                    <span>No resume uploaded</span>
                  )}
                </div>
              </div>
            </div>

            {/* links (JSON input) */}
            <div>
              <label className="text-sm text-gray-700">Links (JSON object)</label>
              <textarea
                className="w-full p-2 border rounded min-h-[80px]"
                placeholder='e.g. {"GitHub":"https://github.com/you","Portfolio":"https://..."}'
                value={JSON.stringify(form.urls || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value || "{}");
                    setForm((f) => ({ ...f, urls: parsed }));
                    setError(null);
                  } catch (err) {
                    setError("Links must be valid JSON");
                  }
                }}
              />
              <div className="mt-1 text-xs text-gray-500">You can paste a small JSON object of named links.</div>
            </div>

            {/* messages */}
            {error && <div className="text-sm text-red-600">{error}</div>}
            {success && <div className="text-sm text-green-700">{success}</div>}

            {/* footer actions (duplicate for accessibility) */}
            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={confirmSubmit}
                disabled={submitting}
                className="px-4 py-2 bg-blue-600 text-white rounded shadow-sm disabled:opacity-60"
              >
                {submitting ? "Saving..." : "Save changes"}
              </button>

              <button
                type="button"
                onClick={confirmCancel}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <span className="ml-auto text-sm text-gray-500">
                {submitting ? "Saving..." : "Last saved: just now"}
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Confirm popup (reusable) */}
      <ConfirmPopup
        open={confirmOpen}
        title={popupConfig?.title}
        message={popupConfig?.message}
        confirmText={popupConfig?.confirmText}
        cancelText={popupConfig?.cancelText}
        onConfirm={async () => {
          await confirmAction();
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
      {/* Inline submitting fullscreen loader */}
      {submitting && <Loading text="Saving Profile ..."/>}
    </div>
  );
}
