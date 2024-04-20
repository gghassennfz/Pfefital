import {
  faUserCircle,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = ({ role, IDuser }) => {
  const { pathname } = useLocation();
  if (pathname === "/") return "";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="Profile-container">
          <FontAwesomeIcon className="Profile" icon={faUserCircle} />
          {IDuser && <span className="PrifileText">Identifiant : {IDuser}</span>}
        </div>
      </div>
      <div className="navbar-center">
        {role === "employe" && (
          <h2 className="navbar-brand">Interface Employe</h2>
        )}
        {role === "validator" && (
          <h2 className="navbar-brand">Interface Validateur</h2>
        )}
        {role === "admin" && <h2 className="navbar-brand">Interface Admin</h2>}
      </div>

      <div className="navbar-right">
        
          <Link to="logout" className="navbar-link">
            Déconnexion{" "}
            <FontAwesomeIcon className="logout" icon={faSignOutAlt} />
          </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
