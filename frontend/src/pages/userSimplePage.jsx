import React from "react";

export default function UserSimplePage() {
  return (
    <div>
      <p>User Simple Page</p>
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
