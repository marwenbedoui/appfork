import React from "react";

export default function AdminPage() {
  return (
    <div>
      <p>Admin Page</p>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Deconnexion
      </button>
    </div>
  );
}
