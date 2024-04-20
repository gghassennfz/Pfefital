import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { Employe } from "../models/Employe.js";
import { Validator } from "../models/Validator.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password, role, IDuser }  = req.body;

    if (role === "admin") {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ message: "Admin not registered" });
      }
      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      const token = jwt.sign(
        { username: admin.username, role: "admin" },
        process.env.Admin_key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.status(200).json({ login: true, role: "admin" });


    }
    else if (role === "employe") {
      const employe = await Employe.findOne({ username });
      if (!employe) {
        return res.status(401).json({ message: "Employee not registered" });
      }
      const validPassword = await bcrypt.compare(password, employe.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      const token = jwt.sign(
        { username: employe.username, role: "employe" , IDuser: employe.IDuser},
        process.env.Employe_key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.status(200).json({ login: true, role: "employe" , IDuser: employe.IDuser });

      
    } else if (role === "validator") {
      const validator = await Validator.findOne({ username });
      if (!validator) {
        return res.status(401).json({ message: "Validator not registered" });
      }
      const validPassword = await bcrypt.compare(password, validator.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      const token = jwt.sign(
        { username: validator.username, role: "validator" , IDuser: validator.IDuser},
        process.env.Validator_key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.status(200).json({ login: true, role: "validator" , IDuser: validator.IDuser });
    }
  } catch (err) {
    res.json(err);
  }
});

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Admin" });
  } else {
    jwt.verify(token, process.env.Admin_key, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid token" });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Invalid User" });
  } else {
    jwt.verify(token, process.env.Admin_key, (err, decoded) => {
      if (err) {
        jwt.verify(token, process.env.Employe_key, (err, decoded) => {
          if (err) {
            jwt.verify(token, process.env.Validator_key, (err, decoded) => {
              if (err) {
                return res.status(401).json({ message: "Invalid token" });
              } else {
                req.username = decoded.username;
                req.role = decoded.role;
                req.IDuser = decoded.IDuser;
                next();
              }
            });
          } else {
            req.username = decoded.username;
            req.role = decoded.role;
            req.IDuser = decoded.IDuser;
            next();
          }
        });
      } else {
        // If verified with Admin_key, IDuser will be undefined
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.status(200).json({ login: true, role: req.role , IDuser : req.IDuser });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ logout: true });
});

export { router as AdminRouter, verifyAdmin, verifyUser };
