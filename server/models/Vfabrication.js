import mongoose from "mongoose";
const activity = new mongoose.Schema({
    heure: String,
    cuve: String,
    flacon: String,
    temp: String,
    changement: String,
    gouttes: String,
    volume: String,
    validation: String,
 
});

const vfabricationSchema = new mongoose.Schema({
    productionRetour: String,
    date: String,
    designation: String,
    lot: String,
    nature: String,
    vitesse: String,
    preparation: String,
    activities: [activity],
});

const vfabricationModel = mongoose.model(
  "Verification_Fabrication",
  vfabricationSchema
);

export { vfabricationModel as VerificationFab };
