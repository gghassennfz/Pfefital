import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../assets/logovital.png";
import uu from "../assets/uu.png";
import backgroundImage from "../assets/vitalbackground.jpg";
import Loading from "./Loading";

import "../css/Login.css";

const Login = ({ setRoleVar, setIDuserVar }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = () => {
    setLoading(true); // Set loading state to true before making the request
    axios
      .post("http://localhost:3001/auth/login", { username, password, role })
      .then((res) => {
        setRoleVar(res.data.role);
        setIDuserVar(res.data.IDuser); // Set IDuser
        setTimeout(() => {
          setLoading(false);
          if (res.data.role === "admin") {
            navigate("/home");
            toast(`Welcome Admin`, { type: "success" });
          } else if (res.data.role === "employe") {
            navigate("/home");
            toast(`Welcome employe`, { type: "success" });
          } else if (res.data.role === "validator") {
            navigate("/validateur");
            toast(`Bienvenue validateur`, { type: "success" });
          }
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid Data. Please check your credentials and try again.");
        toast(`Try again`, { type: "error" });
      });
  };

  return (
    <div>
      {loading ? (
        <Loading /> // You can replace Loading component with your actual loading component
      ) : (
        <div
          className="login-page"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "100%",
            backgroundPosition: "center",
          }}
        >
          <div className="containerforlogo">
            <img className="Logologin" src={Logo} alt="Logo" />
            <div className="login-container">
              <h2>Connection :</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="username">Nom_Utilisateur :</label>
                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe :</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role :</label>
                  <select
                    name="role"
                    id="role"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="employe">Employé</option>
                    <option value="validator">Validateur</option>
                  </select>
                </div>
              </form>
              {error && (
                <div
                  className="alert alert-danger"
                  style={{ color: "white", fontSize: "small" }}
                >
                  {error}
                </div>
              )}
              <button className="btn-login" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </div>
          <img className="uu" src={uu} alt="uu" />
        </div>
      )}
    </div>
  );
};

export default Login;
