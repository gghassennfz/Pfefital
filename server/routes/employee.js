import bcrypt from "bcrypt";
import express from "express";
import { Employe } from "../models/Employe.js";
import { verifyAdmin } from "./auth.js";

const router = express.Router();

router.post('/register', verifyAdmin, async (req, res) => {
  try {
    const { username, password, zone, IDuser } = req.body;
    const employe = await Employe.findOne({ username });
    if (employe) {
      return res.status(409).json({ message: "Employee is already registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newEmploye = new Employe({
      username,
      password: hashPassword,
      zone,
      IDuser
    });
    await newEmploye.save();
    return res.status(201).json({ registered: true });
  } catch (err) {
    return res.status(500).json({ message: "Error in registering employee" });
  }
});
router.get('/all', verifyAdmin, async (req, res) => {
  try {
    const employees = await Employe.find();
    return res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching employees" });
  }
});
router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employe.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching employee by ID" });
  }
});
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, zone, IDuser } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    
    const updatedEmploye = await Employe.findByIdAndUpdate(id, {
      username,
      password: hashPassword,
      zone,
      IDuser
    });
    
    if (!updatedEmploye) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    return res.status(200).json({ updated: true }); // Send 'updated: true' if the update was successful
  } catch (err) {
    return res.status(500).json({ message: "Error updating employee details" });
  }
});


router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await Employe.findByIdAndDelete(id);
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting employee" });
  }
});

export { router as employeRouter };
