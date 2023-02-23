import React from "react";
import LayoutComponent from "../components/LayoutComponent";
import TableComponent from "../components/TableComponent";
import TalanLogo from "../assets/talan-logo.png"

export default function TesteurPage() {
  return (
    // <div>
    //   <p>Testeur Page</p>
    //   <button
    //     onClick={() => {
    //       {
    //         localStorage.clear();
    //         window.location.href = "/login";
    //       }
    //     }}
    //   >
    //     Deconnexion
    //   </button>
    // </div>
    <>
      <LayoutComponent headerLogo={TalanLogo} mainContent={<TableComponent />}>

      </LayoutComponent>

    </>
  );
}
