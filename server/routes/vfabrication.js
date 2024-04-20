import express from "express";
import { VerificationFab } from "../models/Vfabrication.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { productionRetour, date, designation, lot, nature, vitesse, preparation, activities } = req.body;
    const newVerificationFab = new VerificationFab({
      productionRetour, date, designation, lot, nature, vitesse, preparation, activities
    });
    await newVerificationFab.save();
    return res.json({ added: true });
  } catch (err) {
    return res.json({ message: "Error in adding verification" });
  }
});

router.get("/vfabrication", async (req, res) => {
  try {
    const verifications = await VerificationFab.find();
    return res.json(verifications);
  } catch (err) {
    return res.json(err);
  }
});

router.get("/vfabrication/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedVerification = await VerificationFab.findById(id);
    return res.json({ verification: updatedVerification });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/vfabrication/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedVerification = await VerificationFab.findByIdAndUpdate(id, req.body);
    return res.json({ updated: true, verification: updatedVerification });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/vfabrication/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedVerification = await VerificationFab.findByIdAndDelete(id);
    return res.json({ deleted: true, verification: deletedVerification });
  } catch (err) {
    return res.json(err);
  }
});

export { router as VfabricationRouter };
