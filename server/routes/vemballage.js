import express from "express";
import { VerificationEmb } from "../models/Vemballage.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { lot, dlc, date, action, chef, programme, validation, activities } = req.body;
    const newVerificationEmb = new VerificationEmb({
        lot, dlc, date, lot, action, chef, programme,validation, activities
    });
    await newVerificationEmb.save();
    return res.json({ added: true });
  } catch (err) {
    return res.json({ message: "Error in adding verification" });
  }
});

router.get("/vemballage", async (req, res) => {
  try {
    const verifications = await VerificationEmb.find();
    return res.json(verifications);
  } catch (err) {
    return res.json(err);
  }
});

router.get("/vemballage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedVerification = await VerificationEmb.findById(id);
    return res.json({ verification: updatedVerification });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/vemballage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedVerification = await VerificationEmb.findByIdAndUpdate(id, req.body);
    return res.json({ updated: true, verification: updatedVerification });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/vemballage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedVerification = await VerificationEmb.findByIdAndDelete(id);
    return res.json({ deleted: true, verification: deletedVerification });
  } catch (err) {
    return res.json(err);
  }
});

export { router as VemballageRouter };
