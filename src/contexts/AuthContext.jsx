// src/contexts/AuthContext.jsx
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE || "";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
      if (!res.ok) {
        setUser(null);
      } else {
        const data = await res.json();
        setUser(data.user || data);
      }
    } catch (err) {
      console.error("fetchMe error", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  async function loginWithOtp(email, otp) {
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp }),
      });
      if (!res.ok) throw new Error("Login failed");
      await fetchMe();
      return true;
    } catch (err) {
      throw err;
    }
  }

  async function logout() {
    try {
      await fetch(`${API_BASE}/auth/logout`, { method: "POST", credentials: "include" });
    } catch (err) {
      console.warn("logout failed", err);
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, fetchMe, loginWithOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// useAuth uses useContext (safe — no missing named import)
export function useAuth() {
  return useContext(AuthContext);
}
