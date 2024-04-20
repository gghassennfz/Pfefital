// App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddFiche1 from "./components/AddFiche1";
import AddFiche2 from "./components/AddFiche2";
import AddUser from "./components/AddUser";
import Dashboard from "./components/Dashboard";
import DeleteFiche1 from "./components/DeleteFiche1";
import DisplayUsers from "./components/Displayusers";
import EditFiche1 from "./components/EditFiche1";
import EditVfabrication from "./components/EditVfabrication";
import EditVeriPese from "./components/EditVerifpese";
import EditVnettoayge from "./components/EditVnettoyage";
import Fabrication from "./components/Fabrication";
import Fiche1Card from "./components/Fiche1Card";
import Fiches1 from "./components/Fiches1";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import Nettoyage from "./components/Nettoyage";
import Pese from "./components/Pese";
import Sidebar from "./components/Sidebar";
import UsersDisplay from "./components/UsersDisplay";
import Validateur from "./components/Validateur";
import VerifFab from "./components/VerifFab";
import VerificationNettoyage from "./components/VerifNettoyage";
import VerifPese from "./components/VerifPese";
import Stat from "./components/stat";
import Verifemballage from "./components/Verifemballage";
import Emballage from "./components/Emballage";
import EditVemballage from "./components/EditVEmballage";
import EditUser from "./components/Edituser";

function App() {
  const [role, setRole] = useState("");
  const [IDuser, setIDuser] = useState(""); // State for IDuser
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verify")
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role);
          setIDuser(res.data.IDuser); // Set IDuser if available
        } else {
          setRole("");
          setIDuser(""); // Reset IDuser if not available
        }
        console.log(res);
      })
      .catch((err) =>
        console.error("Error fetching authentication status:", err)
      );
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-left" />
      <Sidebar role={role}>
        <Navbar role={role} IDuser={IDuser} /> {/* Pass IDuser to Navbar */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/fiches1" element={<Fiches1 role={role} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/edit/:userType/:id" element={<EditUser />} />
          <Route path="/logout" element={<Logout setRole={setRole} />} />
          <Route path="/addfiche1" element={<AddFiche1 />} />
          <Route path="/addfiche2" element={<AddFiche2 />} />
          <Route path="/fiche1/:id" element={<EditFiche1 />} />
          <Route path="/delete/:id" element={<DeleteFiche1 />} />
          <Route
            path="/"
            element={
              <Login
                setRoleVar={setRole}
                setIDuserVar={setIDuser}
              />
            }
          />
          <Route
            path="/verificationNettoyage"
            element={<VerificationNettoyage />}
          />
          <Route path="/nettoyage" element={<Nettoyage />} />
          <Route path="/fabrication" element={<Fabrication />} />
          <Route path="/emballage" element={<Emballage />} />
          <Route path="/verifpese" element={<VerifPese />} />
          <Route path="/verifemballage" element={<Verifemballage />} />
          <Route path="/pese" element={<Pese />} />
          <Route path="/validateur" element={<Validateur />} />
          <Route path="/vnettoyage/:id" element={<EditVnettoayge />} />
          <Route path="/vfabrication/:id" element={<EditVfabrication />} />
          <Route path="/vpese/:id" element={<EditVeriPese />} />
          <Route path="/vemballage/:id" element={<EditVemballage />} />
          <Route
            path="/display-employees"
            element={<DisplayUsers userType="employe" />}
          />
          <Route
            path="/display-validators"
            element={<DisplayUsers userType="validator" />}
          />
          <Route path="/fiche1/:id" element={<Fiche1Card />} />
          <Route path="/veriffab" element={<VerifFab />} />
          <Route path="/userpage" element={<UsersDisplay />} />
          <Route path="/stat" element={<Stat />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
