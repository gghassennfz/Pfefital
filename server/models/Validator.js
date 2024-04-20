import mongoose from "mongoose";

const validatorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  zone: { type: String, required: true },
  IDuser: { type: Number, required: true },
});

const validatorModel = mongoose.model("Validator", validatorSchema);
export { validatorModel as Validator };
