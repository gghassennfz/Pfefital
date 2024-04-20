import mongoose from "mongoose";

const fiche1Schema = new mongoose.Schema({
    Mp: { type: String },
    Lot: { type: String },
    DLC: { type: String },
    Quantite: { type: String },
    Etanchite: { type: String },
    Etiquette: { type: String },
    statut: { type: String, default: " en attente " }, // Default status
});

const Fiche1 = mongoose.model('Fiche1', fiche1Schema);

export { Fiche1 };
