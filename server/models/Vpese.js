import mongoose from "mongoose";
const activity = new mongoose.Schema({
  lmp: String,
  lot: String,
  dlc: String,
  quantite: String,
  etanchite: String,
  fournisseur: String,
});

const vpeseSchema = new mongoose.Schema({
  DV: String,
  RBT: String,
  Pfabrication: String,
  Ptransfert: String,
  Vpartage: String,
  VU: String,
  VP: String,
  Verifsacs: String,
  Nombreprep: String,
  Dateproo : String,
  DPF: String,
  LOT: String,
  Dp: String,
  DLC: String,
  activities: [activity],
});

const VpeseModel = mongoose.model("Verification_Pese", vpeseSchema);

export { VpeseModel as VerificationPese };
