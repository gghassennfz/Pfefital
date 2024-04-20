import express from 'express';
import { Fiche1 } from '../models/Fiche1.js';
const router = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/add',  async (req, res) => {
    try {
        const { Mp, Lot, DLC, Quantite, Etanchite, Etiquette } = req.body;
        const newFiche1 = new Fiche1({
            Mp,
            Lot,
            DLC,
            Quantite,
            Etanchite,
            Etiquette
        });
        await newFiche1.save();
        return res.json({ added: true });
    } catch (err) {
        return res.json({ message: "Error in adding fiche" });
    }
});

router.get('/fiches1', async (req, res) => {
    try {
        const fiches1 = await Fiche1.find();
        return res.json(fiches1);
    } catch (err) {
        return res.json(err);
    }
});

router.get('/fiche1/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const fiche1 = await Fiche1.findById(id);
        return res.json(fiche1);
    } catch (err) {
        return res.json(err);
    }
});

router.put('/fiche1/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedFiche1 = await Fiche1.findByIdAndUpdate(id, req.body);
        return res.json({ updated: true, fiche1: updatedFiche1 });
    } catch (err) {
        return res.json(err);
    }
});

router.delete('/fiche1/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedFiche1 = await Fiche1.findByIdAndDelete(id);
        return res.json({ deleted: true, fiche1: deletedFiche1 });
    } catch (err) {
        return res.json(err);
    }
});

export { router as Fiche1Router };
