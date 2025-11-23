// src/admin/pages/Profile.jsx
import React from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const API_BASE = import.meta.env.VITE_API_BASE || "";
const LOGO_PATH = "/mnt/data/8ffc2624-e0d1-4ac2-837a-29a0c7700757.png";

export default function Profile() {
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const r = await fetch(`${API_BASE}/profile`, { credentials: "include" });
        if (!r.ok) throw new Error("Failed to fetch profile");
        const data = await r.json();
        if (!mounted) return;
        setProfile(data);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setError(String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  /* ------------------------------------
     LOADING
  ------------------------------------- */
  if (loading) return <Loading fullscreen text="Loading profile..." />;

  /* ------------------------------------
     ERROR STATE
  ------------------------------------- */
  if (error) {
    return (
      <div className="bg-green-100 p-6 min-h-[50vh] flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-red-600">Failed to load profile</h2>
          <p className="mt-2 text-sm text-gray-600">Error: {error}</p>
          <div className="mt-4">
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-royal-blue text-white rounded">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------
     NO PROFILE — SHOW ADD BUTTON
  ------------------------------------- */
  if (!profile || Object.keys(profile).length === 0) {
    return (
      <div className="bg-green-100 p-6 min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-white p-6 rounded shadow text-center">
          <img
            src={LOGO_PATH}
            alt="logo"
            className="w-20 h-20 mx-auto rounded-lg mb-4"
          />

          <h2 className="text-xl font-semibold">No Profile Found</h2>
          <p className="mt-2 text-sm text-gray-600">
            You haven't created your profile yet.
          </p>

          <Link
            to="/admin/profile/add"
            className="mt-6 inline-block px-5 py-2 bg-royal-blue text-white rounded shadow"
          >
            ➕ Add Profile
          </Link>
        </div>
      </div>
    );
  }

  /* ------------------------------------
     PROFILE DATA
  ------------------------------------- */
  const {
    name,
    gmail,
    about,
    tech_stack = [],
    skills = [],
    roles = [],
    profile_picture_url,
    pdf_url,
    urls = {},
  } = profile;

  const avatarUrl = profile_picture_url || LOGO_PATH;

  return (
    <div className="bg-green-100 p-4 sm:p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
          
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={avatarUrl}
              alt={name || "Profile"}
              className="w-28 h-28 md:w-36 md:h-36 object-contain rounded-lg shadow-sm border"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold leading-tight">{name}</h2>
                <p className="mt-1 text-sm text-gray-600">{gmail}</p>
                <p className="mt-3 text-sm text-gray-700 whitespace-pre-line">{about}</p>
              </div>

              {/* Edit + Resume */}
              <div className="flex items-end gap-3">
                <Link
                  to="/admin/profile/edit"
                  className="px-2 py-1 bg-royal-blue w-8 rounded shadow-sm text-sm"
                  aria-label="Edit Profile"
                  title="Edit Profile"
                >
                  ✏️
                </Link>

                {pdf_url ? (
                  <a href={pdf_url} target="_blank" rel="noreferrer" className="text-sm underline text-jet-black w-8 px-2 py-1" aria-label="Download Resume"
                    title="Download Resume">
                    📄
                  </a>
                ) : (
                  <span className="text-sm text-gray-400">No resume uploaded</span>
                )}
              </div>
            </div>

            {/* Tech stack */}
            <div className="mt-4 flex flex-wrap gap-2">
              {tech_stack.length > 0 ? (
                tech_stack.map((t, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-800 rounded">
                    {t}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-500">No tech stack listed</span>
              )}
            </div>

            {/* Skills & Roles */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Skills</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.length > 0 ? (
                    skills.map((s, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-green-50 text-green-800 rounded">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No skills listed</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700">Roles</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {roles.length > 0 ? (
                    roles.map((r, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-yellow-50 text-yellow-800 rounded">
                        {r}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No roles listed</span>
                  )}
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">Links</h3>
              <div className="mt-2 flex flex-wrap gap-3">
                {urls && Object.keys(urls).length > 0 ? (
                  Object.entries(urls).map(([key, value]) => (
                    <a
                      key={key}
                      href={value}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm underline text-royal-blue"
                    >
                      {key}
                    </a>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">No links provided</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Preview */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Projects preview</h3>
            <Link to="/admin/projects" className="text-sm underline">
              Manage projects
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            A quick view of your projects. Open the Projects page to add/edit entries.
          </p>
        </div>
      </div>
    </div>
  );
}
