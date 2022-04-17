import React from "react";

function NavBar() {
  return (
    <nav className="flex-spc-btwn gap-mdm note-nav">
      <div className="">
        <p className="margin-zero">
          <span>
            <i className="fas fa-bars"></i>
          </span>
          Keep
        </p>
      </div>
      <div className="search-container">
        <input type="search" name="" id="" className="search-input" />
      </div>
      <div className="flex-spc-btwn">
        <span>
          <i className="fas fa-gear"></i>
        </span>
        <span>
          <i className="fab fa-github"></i>
        </span>
      </div>
    </nav>
  );
  s;
}

export default NavBar;
