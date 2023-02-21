/* eslint-disable no-lone-blocks */
import React from "react";

export default function TesteurPage() {
  return (
    <div>
      <p>Testeur Page</p>
      <button
        onClick={() => {
          {
            localStorage.clear();
            window.location.href = "/login";
          }
        }}
      >
        Deconnexion
      </button>
    </div>
  );
}
