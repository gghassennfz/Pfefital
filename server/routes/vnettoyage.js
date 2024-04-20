import express from "express";
import { VerificationNett } from "../models/Vnettoyage.js";
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { Produit, Lot, Dp, activities } = req.body;
    const newVerificationNett = new VerificationNett({
      Produit,
      Lot,
      Dp,
      activities,
    });
    await newVerificationNett.save();
    return res.json({ added: true });
  } catch (err) {
    return res.json({ message: "Error in adding verification" });
  }
});

router.get("/vnettoyage", async (req, res) => {
  try {
    const verifications = await VerificationNett.find();
    return res.json(verifications);
  } catch (err) {
    return res.json(err);
  }
});

router.get("/vnettoyage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedVerification = await VerificationNett.findById(id);
    return res.json({ verification: updatedVerification });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/vnettoyage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedVerification = await VerificationNett.findByIdAndUpdate(
      id,
      req.body
    );
    return res.json({ updated: true, verification: updatedVerification });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/vnettoyage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedVerification = await VerificationNett.findByIdAndDelete(id);
    return res.json({ deleted: true, verification: deletedVerification });
  } catch (err) {
    return res.json(err);
  }
});

export { router as VnettoyageRouter };
