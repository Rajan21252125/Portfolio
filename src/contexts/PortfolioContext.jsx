import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || "";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [profileData, setProfileData] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          fetch(`${API_BASE}/profile`),
          fetch(`${API_BASE}/projects`)
        ]);

        if (!profileRes.ok || !projectsRes.ok) {
          throw new Error("Failed to fetch portfolio data");
        }

        const profile = await profileRes.json();
        const projects = await projectsRes.json();

        setProfileData(profile);
        setProjectData(Array.isArray(projects) ? projects : []);
      } catch (err) {
        console.error("Error fetching portfolio context:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ profileData, projectData, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
