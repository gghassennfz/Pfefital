import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AddUser.css";

const AddForm = () => {
  const [option, setOption] = useState("employe");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [zone, setZone] = useState("zone1");
  const [IDuser, setIDuser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const idRegex = /^\d{4}$/;
    if (!idRegex.test(IDuser)) {
      setError("Code doit etre 4 chiffres");
      return;
    }
    setError("");
    const validZones = ["zone1", "zone2", "zone3", "zone4", "zone5", "zone6"];
    if (!validZones.includes(zone)) {
      setError("Invalid zone selection");
      return;
    }
    const url =
      option === "employe"
        ? "http://localhost:3001/employe/register"
        : "http://localhost:3001/validator/register";
    axios
      .post(url, { username, password, zone, IDuser })
      .then((res) => {
        if (res.data.registered) {
          navigate("/dashboard");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
   <div className="hero">
    <div className="appc">
    <div className="work">
      <div className="employe-form-container">
        <form className="employe-form" onSubmit={handleSubmit}>
          <h2>
            Ajouter Utilisateur (
            {option === "employe" ? "Employe" : "Validator"})
          </h2>
          <div className="form-group">
            <label htmlFor="username">UserName:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="IDuser">Code:</label>
            <input
              type="text"
              id="IDuser"
              name="IDuser"
              onChange={(e) => setIDuser(e.target.value)}
            />
            <div
              className="alert alert-danger"
              style={{ color: "red", fontSize: "small",marginTop: "5px" }}
            >
              {error}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="zone">Zone:</label>
            <select
              id="zone"
              name="zone"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
            >
              <option value="zone1">Zone 1</option>
              <option value="zone2">Zone 2</option>
              <option value="zone3">Zone 3</option>
              <option value="zone4">Zone 4</option>
              <option value="zone5">Zone 5</option>
              <option value="zone6">Zone 6</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="option">Role:</label>
            <select
              id="option"
              name="option"
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="employe">Employee</option>
              <option value="validator">Validator</option>
            </select>
          </div>
          <button type="submit" className="btn-addst">
            Register
          </button>
        </form>
      </div>
    </div>
    </div>
   </div>
  );
};

export default AddForm;
