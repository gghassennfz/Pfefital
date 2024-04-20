import mongoose from "mongoose";
const activity = new mongoose.Schema({
  machine: String,
  produit: String,
  reference: String,
  nettDesinfection: String,
  rincage: String,
  validationRinsage: String,
  verificationConformite: String,
  testAllergene: String,
  validationTest: String,
  observation: String,
});

const vnettoyageSchema = new mongoose.Schema({
  Produit: String,
  Lot: String,
  Dp: String,
  activities: [activity],
});

const vnettoyageModel = mongoose.model(
  "Verification_Nettoyage",
  vnettoyageSchema
);

export { vnettoyageModel as VerificationNett };
