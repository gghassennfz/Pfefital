import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplayUsers = ({ userType }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/${userType}/all`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, [userType]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/${userType}/${id}`)
      .then((res) => {
        console.log(res.data);
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => console.error("Error deleting user:", err));
  };
  
  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <h2>{userType === "employe" ? "Employees" : "Validators"}</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>ID</th>
                <th>Zone</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.IDuser}</td>
                  <td>{user.zone}</td>
                  <td>{user.password}</td>
                  <td>
                    <Link to={`/edit/${userType}/${user._id}`}><button>Edit</button></Link>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplayUsers;
