import React from "react";
import AuthButtons from "./AuthButtons";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="bg-purple-400 text-5xl flex justify-center m-4 p-6">Code Duel Lobby </div>
      <div className="navbar-menu">
        <div className="navbar-start"></div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
