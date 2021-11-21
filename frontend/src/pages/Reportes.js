import React from "react";
import Content from "../components/Content/Content";

function Reportes({RolId}) {
  return (
    <div className="page-content">
      <Content site="Registros" modulo="Reporte" />
      <div className="page-component">
        <h1>{RolId}</h1>
      </div>
    </div>
  );
}

export default Reportes;
