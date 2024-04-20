import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Displayuser.css";

const DisplayUser = () => {
  const [employees, setEmployees] = useState([]);
  const [validators, setValidators] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/employe/all`)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.error("Error fetching employees:", err));

    axios
      .get(`http://localhost:3001/validator/all`)
      .then((res) => {
        setValidators(res.data);
      })
      .catch((err) => console.error("Error fetching validators:", err));
  }, []);

  const handleDelete = (id, userType) => {
    axios
      .delete(`http://localhost:3001/${userType}/${id}`)
      .then((res) => {
        console.log(res.data);
        if (userType === "employe") {
          setEmployees(employees.filter((employee) => employee._id !== id));
        } else if (userType === "validator") {
          setValidators(validators.filter((validator) => validator._id !== id));
        }
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <div className="content">
            <div className="left-content">
              <h2 className="table-title">Employees</h2>
              <table className="user-table">
                <thead className="user-thead">
                  <tr className="user-tr">
                    <th className="user-th">Username</th>
                    <th className="user-th">ID</th>
                    <th className="user-th">Zone</th>
                    <th className="user-th">Password</th>
                    <th className="user-th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee._id} className="user-tr">
                      <td className="user-td">{employee.username}</td>
                      <td className="user-td">{employee.IDuser}</td>
                      <td className="user-td">{employee.zone}</td>
                      <td className="user-td">{employee.password}</td>
                      <td className="user-td">
                        <Link to={`/edit/employe/${employee._id}`}>
                          <button className="edit-btn">Edit</button>
                        </Link>
                        <button className="delete-btn" onClick={() => handleDelete(employee._id, "employe")}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="right-content">
              <h2 className="table-title">Validators</h2>
              <table className="user-table">
                <thead className="user-thead">
                  <tr className="user-tr">
                    <th className="user-th">Username</th>
                    <th className="user-th">ID</th>
                    <th className="user-th">Zone</th>
                    <th className="user-th">Password</th>
                    <th className="user-th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {validators.map((validator) => (
                    <tr key={validator._id} className="user-tr">
                      <td className="user-td">{validator.username}</td>
                      <td className="user-td">{validator.IDuser}</td>
                      <td className="user-td">{validator.zone}</td>
                      <td className="user-td">{validator.password}</td>
                      <td className="user-td">
                        <Link to={`/edit/validator/${validator._id}`}>
                          <button className="edit-btn">Edit</button>
                        </Link>
                        <button className="delete-btn" onClick={() => handleDelete(validator._id, "validator")}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayUser;
