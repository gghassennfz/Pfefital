import bcrypt from "bcrypt";
import express from "express";
import { Validator } from "../models/Validator.js"; 
import { verifyAdmin } from "./auth.js";

const router = express.Router();

router.post('/register', verifyAdmin, async (req, res) => {
  try {
    const { username, password, zone, IDuser } = req.body;
    const validator = await Validator.findOne({ username });
    if (validator) {
      return res.status(409).json({ message: "Validator is already registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newValidator = new Validator({
      username,
      password: hashPassword,
      zone,
      IDuser
    });
    await newValidator.save();
    return res.status(201).json({ registered: true });
  } catch (err) {
    return res.status(500).json({ message: "Error in registering validator" });
  }
});
router.get('/all', verifyAdmin, async (req, res) => {
  try {
    const validators = await Validator.find();
    return res.status(200).json(validators);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching validators" });
  }
});
router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const validator = await Validator.findById(id);
    if (!validator) {
      return res.status(404).json({ message: "Validator not found" });
    }
    return res.status(200).json(validator);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching validator by ID" });
  }
});
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, zone, IDuser } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    
    const updatedValidator = await Validator.findByIdAndUpdate(id, {
      username,
      password: hashPassword,
      zone,
      IDuser
    });
    
    if (!updatedValidator) {
      return res.status(404).json({ message: "Validator not found" });
    }
    
    return res.status(200).json({ message: "Validator details updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error updating validator details" });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await Validator.findByIdAndDelete(id);
    return res.status(200).json({ message: "Validator deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting validator" });
  }
});

export { router as validatorRouter };
