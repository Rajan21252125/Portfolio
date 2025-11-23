// src/admin/pages/AdminPending.jsx
import React from "react";
import ConfirmPopup from "../components/ConfirmPopup"; // adjust path if needed
import Loading from "../components/Loading";

const API_BASE = import.meta.env.VITE_API_BASE || "";
const LOGO_PATH = "/mnt/data/8ffc2624-e0d1-4ac2-837a-29a0c7700757.png";

export default function AdminPending() {
  const [pendingUsers, setPendingUsers] = React.useState([]);
  const [approvedUsers, setApprovedUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [actionLoading, setActionLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [partialApprove, setPartialApprove] = React.useState([]);

  // popup state
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupProps, setPopupProps] = React.useState({
    type: "confirm",
    title: "",
    message: "",
    confirmText: "Yes",
    cancelText: "No",
    onConfirm: null,
    onCancel: null
  });

  async function fetchPending() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/admin/pending-users`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const pending = Array.isArray(data?.pending) ? data.pending : [];
      const approved = Array.isArray(data?.approved) ? data.approved : [];
      const pendingIds = new Set(pending.map((u) => u.id));
      setPendingUsers(pending);
      setApprovedUsers(approved.filter((u) => !pendingIds.has(u.id)));
      setPartialApprove(data.userApproval || []);
    } catch (err) {
      console.error(err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchPending();
  }, []);

  async function doAction(endpointPath, userId) {
    setActionLoading(userId);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}${endpointPath.replace(":id", String(userId))}`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Request failed with status ${res.status}`);
      }
      await fetchPending();
    } catch (err) {
      console.error(err);
      setError(String(err));
    } finally {
      setActionLoading(null);
    }
  }

  // show popup helper
  function openPopup({ type = "confirm", title = "", message = "", confirmText = "Yes", cancelText = "No", onConfirm }) {
    setPopupProps({
      type,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm: async () => {
        try {
          // run user-supplied confirm action
          await onConfirm();
        } finally {
          setPopupOpen(false);
        }
      },
      onCancel: () => setPopupOpen(false),
    });
    setPopupOpen(true);
  }

  const verifyUser = (id) =>
    openPopup({
      type: "info",
      title: "Verify user email",
      message: "Mark this user's email as verified? This is an admin override.",
      confirmText: "Verify",
      cancelText: "Cancel",
      onConfirm: () => doAction("/auth/resend-verification/:id", id),
    });

  const approveUser = (id) =>
    openPopup({
      type: "confirm",
      title: "Approve user",
      message: "Approve this user and send them a notification email?",
      confirmText: "Approve",
      cancelText: "Cancel",
      onConfirm: () => doAction("/auth/admin/approve-user/:id", id)
    });

  const rejectUser = (id) =>
    openPopup({
      type: "danger",
      title: "Reject user",
      message: "Reject this user. They will receive a notification. Are you sure?",
      confirmText: "Reject",
      cancelText: "Cancel",
      onConfirm: () => doAction("/auth/admin/reject-user/:id", id),
    });

  return (
    loading ? <Loading fullscreen text="Loading users..." /> : <div className="min-h-screen bg-green-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* header etc same as before */}
        <header className="flex items-start md:items-center gap-4 mb-6">
          <img src={LOGO_PATH} alt="logo" className="w-12 h-12 sm:w-14 sm:h-14 rounded-md object-cover flex-shrink-0" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Admin — User Approvals</h1>
            <p className="text-sm text-gray-600">Review and manage newly signed-up users</p>
          </div>
          <div className="ml-auto">
            <button onClick={fetchPending} className="px-3 py-2 bg-green-600 text-white rounded shadow-sm text-sm" disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </header>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-100 rounded text-sm">{error}</div>}

        {/* lists (same layout as earlier) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Approved */}
          <section className="bg-white rounded shadow p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Approved Users</h2>
              <span className="text-sm text-gray-500">{approvedUsers.length}</span>
            </div>
            {approvedUsers.length === 0 ? (
              <div className="text-sm text-gray-500">No approved users</div>
            ) : (
              <div className="space-y-3">
                {approvedUsers.map((u) => (
                  <article key={u.id} className="p-3 sm:p-4 border rounded flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-medium text-sm sm:text-base">{u.email}</div>
                      <div className="text-xs text-gray-500 mt-1">Signed up: {new Date(u.created_at).toLocaleString()}</div>
                      <div className="mt-2 text-xs flex flex-wrap gap-2">
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded text-[11px]">Approved</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Pending */}
          <section className="bg-white rounded shadow p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Pending Users</h2>
              <span className="text-sm text-gray-500">{pendingUsers.length}</span>
            </div>
            {pendingUsers.length === 0 ? (
              <div className="text-sm text-gray-500">No pending users</div>
            ) : (
              <div className="space-y-3">
                {pendingUsers.map((u) => (
                  <article key={u.id} className="p-3 sm:p-4 border rounded flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-medium text-sm sm:text-base">{u.email}</div>
                      <div className="text-xs text-gray-500 mt-1">Signed up: {new Date(u.created_at).toLocaleString()}</div>
                      <div className="mt-2 text-xs flex flex-wrap gap-2">
                        {u.is_verified ? <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[11px]">Verified</span> : <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-[11px]">Email not verified</span>}
                        {u.is_approved ? <span className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded text-[11px]">Approved</span> : <span className="inline-block bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-[11px]">Awaiting approval</span>}
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-full md:w-auto flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                      {!u.is_verified && (
                        <button  onClick={() => verifyUser(u.id)} className="w-full md:w-auto px-3 py-2 bg-yellow-600 text-white rounded text-sm" disabled={actionLoading === u.id} aria-label={`Verify ${u.email}`}>
                          {actionLoading === u.id ? "Working..." : "Verify"}
                        </button>
                      )}

                      {!u.is_approved && (
                        <button onClick={() => approveUser(u.id)} className="w-full md:w-auto px-3 py-2 bg-green-600 text-white rounded text-sm" disabled={actionLoading === u.id} aria-label={`Approve ${u.email}`}>
                          {actionLoading === u.id ? "Working..." : "Approve"}
                        </button>
                      )}

                      <button onClick={() => rejectUser(u.id)} className="w-full md:w-auto px-3 py-2 bg-red-50 text-red-700 border border-red-100 rounded text-sm" disabled={actionLoading === u.id} aria-label={`Reject ${u.email}`}>
                        {actionLoading === u.id ? "Working..." : "Reject"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Tip: <span className="font-medium">Verify</span> will mark their email verified (admin override). <span className="font-medium">Approve</span> will allow them to sign in. Use <span className="font-medium">Reject</span> to deny signup.
        </div>
      </div>

      {/* Confirm popup instance */}
      <ConfirmPopup
        open={popupOpen}
        type={popupProps.type}
        title={popupProps.title}
        message={popupProps.message}
        confirmText={popupProps.confirmText}
        cancelText={popupProps.cancelText}
        onConfirm={popupProps.onConfirm}
        onCancel={popupProps.onCancel}
      />
    </div>
  );
}
