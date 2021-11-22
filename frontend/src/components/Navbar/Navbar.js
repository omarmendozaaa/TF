import React from "react";
import "./Navbar.css";
import { RolesData } from "./RolesData";
import mainicon from "./party-popper.png";

function Navbar({ showSidebar, changeRol}) {
  return (
    <header className="header">
      <div className=".MainIconNav" onClick={showSidebar}>
        <img className="IconNav" src={mainicon} alt="Party"></img>
      </div>
      <div className="evento">
        <select
          className="custom-select form-control select-evento"
          onChange={(e)=> {changeRol(e.target.value)}}
        >
          {RolesData.map((item) => {
            return (
              <option key={item.id} value={item.id} >{item.nombre}</option>
            );
          })}
        </select>
      </div>
      <div className="logOut">
        <ion-icon name="log-out-outline"></ion-icon>
      </div>
    </header>
  );
}

export default Navbar;
