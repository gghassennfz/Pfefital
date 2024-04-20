import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "./db.js";
import { AdminRouter } from "./routes/auth.js";
import { Fiche1Router } from "./routes/fiche1.js";
import { employeRouter } from "./routes/employee.js";
import { validatorRouter } from "./routes/validator.js"; // Import the validatorRouter
import { Fiche1 } from "./models/Fiche1.js";
import { Employe } from "./models/Employe.js";
import { Admin } from "./models/Admin.js";
import { Validator } from "./models/Validator.js"; // Import the Validator model
import { VnettoyageRouter } from "./routes/vnettoyage.js";
import { VpeseRouter } from "./routes/vpese.js";
import { VerificationNett } from "./models/Vnettoyage.js";
import { VerificationPese } from "./models/Vpese.js";
import { VerificationFab } from "./models/Vfabrication.js";
import { VerificationEmb } from "./models/Vemballage.js";
import { VfabricationRouter } from "./routes/vfabrication.js";
import { VemballageRouter } from "./routes/vemballage.js";


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
dotenv.config();
app.use("/auth", AdminRouter);
app.use("/employe", employeRouter);
app.use("/fiche1", Fiche1Router);
app.use("/validator", validatorRouter); // Use the validatorRouter
app.use("/vnettoyage", VnettoyageRouter);
app.use("/vpese" , VpeseRouter );
app.use("/vfabrication" , VfabricationRouter );
app.use("/vemballage" , VemballageRouter )

app.get('/dashboard', async (req, res) => {
  try {
      const employe = await Employe.countDocuments();
      const admin = await Admin.countDocuments();
      const fiche1 = await Fiche1.countDocuments();
      const validator = await Validator.countDocuments(); // Count Validator documents
      const vnettoyage = await VerificationNett.countDocuments();
      const vpese = await VerificationPese.countDocuments();
      const vfabrication = await VerificationFab.countDocuments();
      const vemballage = await VerificationEmb.countDocuments();
      return res.json({ ok: true, employe, fiche1, admin, validator ,vnettoyage ,vpese,vfabrication,vemballage });
  } catch(err) {
      return res.json(err);
  }
});


app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
