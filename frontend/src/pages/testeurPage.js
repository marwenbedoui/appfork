/* eslint-disable no-lone-blocks */
import React from "react";
import LayoutComponent from "../components/LayoutComponent";
import TableComponent from "../components/TableComponent";
//import TableComponent from "../components/TableComponent";

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
      <LayoutComponent headerText={"Welcome Mr Tester"} mainContent={<TableComponent />}>

      </LayoutComponent>

    </>
  );
}
