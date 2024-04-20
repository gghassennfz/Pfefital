import mongoose from "mongoose";
const activity = new mongoose.Schema({
    dateheured: String,
    dateheureh: String,
    article: String,
    version: String,
    datation: String,
    lddc: String,
    qualitearticle: String,
    prelevee: String,
    nonconfirme: String,
    decision: String,
    controle: String,
 
});

const vemballageSchema = new mongoose.Schema({
    lot: String,
    dlc: String,
    date: String,
    action: String,
    chef: String,
    programme: String,
    validation: String,
    activities: [activity],
});

const vemballageModel = mongoose.model(
  "Verification_Emballage",
  vemballageSchema
);

export { vemballageModel as VerificationEmb };
