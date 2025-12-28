// src/admin/pages/Login.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../../contexts/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE || "";
const LOGO = "/icons8-portfolio-48.png";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [stage, setStage] = React.useState("credentials"); // credentials | otp
  const [message, setMessage] = React.useState(null);
  const [otp, setOtp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [resendDisabled, setResendDisabled] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchMe } = useAuth();

  // redirect target (if RequireAuth sent a `state.from`)
  const from = location.state?.from?.pathname || "/admin";

  // Request OTP (step 1)
  async function requestOtp(e) {
    e?.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data.message || "Failed to request OTP");
        setLoading(false);
        return;
      }

      setMessage("OTP sent to your email. Check spam if you don't see it.");
      setStage("otp");
      // prevent rapid resend
      setResendDisabled(true);
      setTimeout(() => setResendDisabled(false), 15_000);
    } catch (err) {
      console.error(err);
      setMessage(String(err));
    } finally {
      setLoading(false);
    }
  }

  // Verify OTP (step 2)
  async function verifyOtp(e) {
    e?.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data.message || "Invalid OTP");
        setLoading(false);
        return;
      }

      setMessage("Logged in successfully");
      // refresh AuthContext / user info
      if (typeof fetchMe === "function") {
        try {
          await fetchMe();
        } catch (err) {
          // ignore, still navigate
          console.warn("fetchMe failed:", err);
        }
      }

      // navigate to previous page or admin home
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setMessage(String(err));
    } finally {
      setLoading(false);
    }
  }

  // Resend OTP button (calls login endpoint again)
  async function resendOtp() {
    if (resendDisabled) return;
    setMessage(null);
    setResendDisabled(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data.message || "Failed to resend OTP");
        setResendDisabled(false);
        return;
      }
      setMessage("OTP resent. Check your inbox.");
      setTimeout(() => setResendDisabled(false), 15_000);
    } catch (err) {
      console.error(err);
      setMessage(String(err));
      setResendDisabled(false);
    }
  }

  // Small helper UI sections
  const CredentialForm = (
    <form onSubmit={requestOtp} className="mt-4 space-y-3">
      <label className="block">
        <span className="text-sm text-gray-600">Email</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@gmail.com"
          className="w-full p-2 border rounded mt-1"
          type="email"
          required
          autoFocus
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">Password</span>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          type="password"
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      <div className="flex items-center justify-between gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-royal-blue text-white rounded shadow-sm"
          disabled={loading}
        >
          {loading ? "Requesting..." : "Request OTP"}
        </button>
        <button
          type="button"
          className="text-sm text-gray-600 underline"
          onClick={() => { setEmail(""); setPassword(""); }}
        >
          Clear
        </button>
      </div>
    </form>
  );

  const OtpForm = (
    <form onSubmit={verifyOtp} className="mt-4 space-y-3">
      <div className="text-sm text-gray-600">Enter the 6-digit code sent to your email.</div>

      <label className="block">
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="123456"
          className="w-full p-2 border rounded mt-1 text-lg tracking-widest text-center"
          required
          inputMode="numeric"
        />
      </label>

      <div className="flex items-center justify-between gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-royal-blue text-white rounded shadow-sm"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify & Sign in"}
        </button>

        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => { setStage("credentials"); setMessage(null); }}
            className="text-sm text-gray-600 underline"
          >
            Use different account
          </button>

          <button
            type="button"
            onClick={resendOtp}
            disabled={resendDisabled}
            className="text-sm px-3 py-1 rounded border text-jet-black bg-white disabled:opacity-60"
          >
            {resendDisabled ? "Wait..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <img src={LOGO} alt="logo" className="w-12 h-12 rounded-md object-cover" />
            <div>
              <h2 className="text-xl font-semibold">Admin Sign in</h2>
              <p className="text-sm text-gray-600">Sign in to manage your portfolio</p>
            </div>
          </div>

          <div className="mt-4">
            {stage === "credentials" ? CredentialForm : OtpForm}
          </div>

          <div className="mt-4">
            {message && (
              <div className="text-sm text-center text-red-600">{message}</div>
            )}
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            By signing in you agree to your admin privileges being used responsibly.
          </div>
        </div>

        {/* small footer with support / quick links */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <div>Need help? <a href={`mailto:${import.meta.env.VITE_SUPPORT_EMAIL || "support@example.com"}`} className="underline">Contact support</a></div>
        </div>
      </div>

      {/* fullscreen loading overlay while busy */}
      {loading && <Loading fullscreen text="Processing..." />}
    </div>
  );
}
