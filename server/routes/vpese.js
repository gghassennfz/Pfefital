import express from "express";
import { VerificationPese } from "../models/Vpese.js";
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const {
      DV,
      RBT,
      Pfabrication,
      Ptransfert,
      Vpartage,
      VU,
      VP,
      Verifsacs,
      Nombreprep,
      Dateproo,
      DPF,
      LOT,
      Dp,
      DLC,
      activities,
    } = req.body;
    const newVerificationPese = new VerificationPese({
      DV,
      RBT,
      Pfabrication,
      Ptransfert,
      Vpartage,
      VU,
      VP,
      Verifsacs,
      Nombreprep,
      Dateproo,
      DPF,
      LOT,
      Dp,
      DLC,
      activities,
    });
    await newVerificationPese.save();
    return res.json({ added: true });
  } catch (err) {
    return res.json({ message: "Error in adding verification Pese" });
  }
});

router.get("/vpese", async (req, res) => {
  try {
    const verifications = await VerificationPese.find();
    return res.json(verifications);
  } catch (err) {
    return res.json(err);
  }
});
router.get("/vpese/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedVerification = await VerificationPese.findById(id);
    return res.json({ verification: updatedVerification });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/vpese/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedVerification = await VerificationPese.findByIdAndUpdate(
      id,
      req.body
    );
    return res.json({ updated: true, verification: updatedVerification });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/vpese/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedVerification = await VerificationPese.findByIdAndDelete(id);
    return res.json({ deleted: true, verification: deletedVerification });
  } catch (err) {
    return res.json(err);
  }
});

export { router as VpeseRouter };
