// src/admin/components/Loading.jsx
import React from "react";

// Local logo (your uploaded icon)
const LOGO = "/icons8-portfolio-48.png"; 
// If this path differs, adjust to: "/mnt/data/8ffc2624-e0d1-4ac2-837a-29a0c7700757.png"

export default function Loading({ text = "Loading...", fullscreen = true }) {
  return (
    <div
      className={`${
        fullscreen ? "fixed inset-0" : "w-full h-full"
      } bg-green-100 flex flex-col items-center justify-center z-50`}
    >
      {/* Spinner Container */}
      <div className="relative flex items-center justify-center">
        
        {/* Outer Ring */}
        <div className="w-20 h-20 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>

        {/* Logo in center */}
        <img
          src={LOGO}
          alt="loading"
          className="absolute w-10 h-10 animate-pulse"
        />
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-gray-700 text-sm font-medium animate-pulse">
        {text}
      </p>
    </div>
  );
}
