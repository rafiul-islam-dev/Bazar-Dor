"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export default function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#ffffff",
          color: "#172018",
          border: "1px solid #dce5dd",
          boxShadow: "0 8px 30px rgba(24, 55, 32, 0.10)",
          fontSize: "14px",
        },
      }}
    />
  );
}