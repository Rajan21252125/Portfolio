// src/components/ConfirmPopup.jsx
import React from "react";
export default function ConfirmPopup({
  open,
  type = "confirm",
  title,
  message,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onCancel,
  iconUrl,
}) {
  if (!open) return null;

  // map popup types to colors
  const typeMap = {
    confirm: "bg-blue-600 text-white",
    danger: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
    success: "bg-green-600 text-white",
  };
  const accent = typeMap[type] || typeMap.confirm;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* modal */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden z-10">
        <div className="flex gap-4 p-5">
          {/* icon area */}
          <div className="flex-shrink-0">
            {iconUrl ? (
              <img
                src={iconUrl}
                alt="icon"
                className="w-14 h-14 rounded-md object-cover"
              />
            ) : (
              <div className={`w-14 h-14 rounded-md flex items-center justify-center ${accent}`}>
                <img
                  src="/icons8-portfolio-48.png"
                  alt="default icon"
                  className="w-14 h-14 rounded-md object-cover"
                />
              </div>
            )}
          </div>

          {/* content */}
          <div className="flex-1">
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            <div className="mt-1 text-sm text-gray-700">
              {typeof message === "string" ? <p>{message}</p> : message}
            </div>

            {/* actions */}
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-end sm:gap-3 gap-2">
              <button
                onClick={onCancel}
                className="w-full sm:w-auto px-4 py-2 rounded border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                aria-label="Cancel"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className={`w-full sm:w-auto px-4 py-2 rounded ${accent} hover:opacity-95 font-semibold`}
                aria-label="Confirm"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
