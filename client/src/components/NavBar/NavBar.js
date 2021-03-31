import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import "./Sections/Navbar.css";

function NavBar() {
  return (
    <nav className="menu" style={{ position: "fixed", width: "100%" }}>
      <div className="menu__logo">
        <a href="/">Apple</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu__right">
          <RightMenu mode="horizontal" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
