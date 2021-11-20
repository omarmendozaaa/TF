import React from "react";
import Content from "../components/Content/Content";

function Dashboard({RolId}) {
  return (
    <div>
      <div className="page-content">
        <Content site="Dashboard" modulo="Bienvenido" />
        <div className="page-component">
          <h1>{RolId}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
