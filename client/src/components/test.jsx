import React, { useEffect, useState } from "react";
import { FaBars, FaHome, FaUserAlt } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Sidebar.css";

const Sidebar = ({ children, role }) => {
  const location = useLocation();
  const { pathname } = location;

  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [activePage, setActivePage] = useState("");

  // Toggle sidebar open/close
  const toggle = () => setIsOpen(!isOpen);

  // Toggle dropdown menu
  const toggleDropdown = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Update activePage state when location changes
  useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

  // Menu items based on user role
  const menuItem = [];
  if (role === "validator") {
    // Validator role menu items
    menuItem.push(
      // Home
      { path: "/validateur", name: "Home", icon: <FaHome /> },
      // Ajouter Doc V dropdown
      {
        name: "Ajouter Doc V",
        icon: <FaUserAlt />,
        dropdown: [
          {
            path: "/verificationNettoyage",
            icon: <FaUserAlt />,
            name: "Doc Nettoyage",
          },
          { path: "/verifpese", icon: <FaUserAlt />, name: "Doc Pese" },
          {
            path: "/docFabrication",
            icon: <FaUserAlt />,
            name: "Doc Fabrication",
          },
        ],
      },
      // Dossier de lot dropdown
      {
        name: "Dossier de lot",
        icon: <FaUserAlt />,
        dropdown: [
          {
            path: "/nettoyage",
            icon: <FaUserAlt />,
            name: "Dossier Nettoyage",
          },
          { path: "/pese", icon: <FaUserAlt />, name: "Dossier Pese" },
          {
            path: "/dossierFabrication",
            icon: <FaUserAlt />,
            name: "Dossier Fabrication",
          },
        ],
      }
    );
  } else if (role === "employe") {
    // Employe role menu items
    menuItem.push(
      { path: "/addFiche", name: "Add Fiche", icon: <FaUserAlt /> },
      { path: "/showFiche", name: "Show Fiche", icon: <FaUserAlt /> },
      { path: "/notifications", name: "Notifications", icon: <FaUserAlt /> }
    );
  } else if (role === "admin") {
    // Admin role menu items
    menuItem.push({
      name: "Gerer User",
      icon: <FaUserAlt />,
      dropdown: [
        { path: "/addUser", name: "Add User", icon: <FaUserAlt /> },
        { path: "/showUsers", name: "Show Users", icon: <FaUserAlt /> },
      ],
    });
  }

  return (
    <div className="container">
      <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
        <div className="top_section">
          <img
            className="logo"
            style={{
              height: isOpen ? "8rem" : "0px",
              width: isOpen ? "8rem" : "0px",
            }}
            src={logo}
            alt="Logo"
          />
          <div
            className="bars"
            style={{
              marginLeft: isOpen ? "25px" : "-40px",
              marginTop: isOpen ? "15px" : "35px",
            }}
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {/* Sidebar menu items */}
        {menuItem.map((item, index) => (
          <div key={index}>
            {/* Dropdown menu */}
            {item.dropdown ? (
              <div
                className={`link1 ${
                  isOpen && openIndex === index ? "active" : ""
                }`}
                onClick={() => toggleDropdown(index)}
              >
                <div className="icon">{item.icon}</div>
                <div className="link_text">{item.name}</div>
                <div className="icon">
                  {isOpen && openIndex === index ? "-" : "+"}
                </div>
              </div>
            ) : (
              // Single link
              <NavLink
                to={item.path}
                className={`link1 ${activePage === item.path ? "active" : ""}`}
                activeClassName="active"
                onClick={() => setActivePage(item.path)}
                key={index}
              >
                <div className="icon">{item.icon}</div>
                <div className="link_text">{item.name}</div>
              </NavLink>
            )}
            {/* Dropdown items */}
            {item.dropdown && isOpen && openIndex === index && (
              <div className="about-dropdown">
                {item.dropdown.map((dropdownItem, dropdownIndex) => (
                  <NavLink
                    to={dropdownItem.path}
                    className={`link1 ${
                      activePage === dropdownItem.path ? "active" : ""
                    }`}
                    activeClassName="active"
                    onClick={() => setActivePage(dropdownItem.path)}
                    key={dropdownIndex}
                  >
                    <div className="icon">{dropdownItem.icon}</div>
                    <div className="link_text">{dropdownItem.name}</div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
