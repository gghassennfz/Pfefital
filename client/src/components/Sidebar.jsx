import React, { useState } from "react";
import {
  FaBars,
  FaTable,
  FaHome,
  FaFileMedical,
  FaShoppingBag,
  FaFileAlt,
  FaFileInvoice,
  FaAngleUp,
  FaAngleDown,
  FaFilePowerpoint,
  FaThList,
  FaChevronCircleDown,
  FaReceipt ,
  FaThLarge,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Sidebar.css";

const Sidebar = ({ children, role }) => {
  const { pathname } = useLocation();
  if (pathname === "/") return children;

  const [isOpen, setIsOpen] = useState(false);
  const [addDocDropdownOpen, setAddDocDropdownOpen] = useState(false); // State for Add Document dropdown
  const [dossierDropdownOpen, setDossierDropdownOpen] = useState(false); // State for Comment dropdown
  const toggle = () => setIsOpen(!isOpen);
  const toggleAddDocDropdown = () => setAddDocDropdownOpen(!addDocDropdownOpen); // Function to toggle Add Document dropdown
  const toggleDossierDropdown = () =>
    setDossierDropdownOpen(!dossierDropdownOpen); // Function to toggle Comment dropdown

  let menuItem = [];
  
  if (role === "validator") {
    menuItem.unshift(
      {
        path: "/validateur",
        name: "Home",
        icon: <FaHome />,
      },
      {
        path: "/fiches1",
        name: "Fiches d'employés",
        icon: <FaReceipt />
        ,
      },
      {
        name: "Ajouter Doc",
        icon: <FaFileMedical />,
        dropdown: [
          {
            name: "Doc Nettoyage",
            icon: <FaFileAlt />,
            path: "/verificationNettoyage",
          },
          {
            name: "Doc Pese",
            icon: <FaFilePowerpoint />,
            path: "/verifpese",
          },
          {
            name: "Doc Fabrication",
            icon: <FaFileInvoice />,
            path: "/veriffab",
          },
          {
            name: "Doc Emballage",
            icon: <FaFileAlt />,
            path: "/verifemballage",
          },
        ],
      },
      {
        path: "/comment",
        name: "Dossier des Lots",
        icon: <FaTable />,
        dropdown: [
          {
            name: "Lots Nettoyage",
            icon: <FaThLarge />,
            path: "/nettoyage",
          },
          {
            name: "Lots Pese",
            icon: <FaThList />,
            path: "/pese",
            
          },
          {
            name: "Lots Fabrication",
            icon: <FaThList />,
            path: "/fabrication",
            
          },
          {
            name: "Lots Emballage",
            icon: <FaThList />,
            path: "/emballage",
            
          },
        ],
      }
    );
  }

  if (role === "admin") {
    menuItem.unshift(
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: <FaHome />,
      },
      {
        path: "/adduser",
        name: "Ajouter Users",
        icon: <FaHome />,
      },
      {
        path: "/userpage",
        name: " users",
        icon: <FaHome />,
      },
      {
        path: "/display-employees",
        name: " Employees",
        icon: <FaHome />,
      },
      {
        path: "/display-validators",
        name: " Validateurs",
        icon: <FaHome />,
      },
      {
        name: "Ajouter Doc",
        icon: <FaFileMedical />,
        dropdown: [
          {
            name: "Doc Nettoyage",
            icon: <FaFileAlt />,
            path: "/verificationNettoyage",
          },
          {
            name: "Doc Pese",
            icon: <FaFilePowerpoint />,
            path: "/verifpese",
          },
          {
            name: "Doc Fabrication",
            icon: <FaFileInvoice />,
            path: "/verifpsfl",
          },
        ],
      },
      {
        path: "/comment",
        name: "Dossier des Lots",
        icon: <FaTable />,
        dropdown: [
          {
            name: "Lots Nettoyage",
            icon: <FaThLarge />,
            path: "/nettoyage",
          },
          {
            name: "Lots Pese",
            icon: <FaThList />,
            path: "/pese",
          },
        ],
      }
    );
  }
  if (role === "employe") {
    menuItem.unshift(
      {
        path: "/addfiche1",
        name: "Fiche Pese",
        icon: <FaHome />,
      },
      {
        path: "/fiches1",
        name: "Fiches",
        icon: <FaHome />,
      },
      {
        path: "/addfiche2",
        name: "Fiche2",
        icon: <FaHome />,
      },
    );
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
            style={{
              marginLeft: isOpen ? "25px" : "-40px",
              marginTop: isOpen ? "15px" : "35px",
            }}
            className="bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <div key={index}>
            {item.dropdown ? (
              <div
                className="link1"
                onClick={() =>
                  item.name === "Ajouter Doc"
                    ? toggleAddDocDropdown()
                    : toggleDossierDropdown()
                }
              >
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  {item.name}
                </div>
                <div className="icon">
                  {item.name === "Ajouter Doc" ? (
                    addDocDropdownOpen ? (
                      <FaAngleUp className="up1"  style={{ display: isOpen ? "block" : "none" }} />
                    ) : (
                      <FaAngleDown className="down1"  style={{ display: isOpen ? "block" : "none" }} />
                    )
                  ) : dossierDropdownOpen ? (
                    <FaAngleUp className="up"  style={{ display: isOpen ? "block" : "none" }} />
                  ) : (
                    <FaAngleDown className="down"  style={{ display: isOpen ? "block" : "none" }} />
                  )}
                </div>
              </div>
            ) : (
              <NavLink to={item.path} className="link1" activeclassname="active">
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  {item.name}
                </div>
              </NavLink>
            )}
            {((item.name === "Ajouter Doc" && addDocDropdownOpen) ||
              (item.name === "Dossier des Lots" && dossierDropdownOpen)) && (
              <div className="dropdown">
                {item.dropdown.map((dropdownItem, idx) => (
                  <NavLink
                    key={idx}
                    to={dropdownItem.path}
                    className="link1"
                    activeclassname="active"
                  >
                    <div className="icon">{dropdownItem.icon}</div>
                    <div
                      style={{ display: isOpen ? "block" : "none" }}
                      className="link_text"
                    >
                      {dropdownItem.name}
                    </div>
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
