import mongoose from "mongoose";
import MODELS from "../constant/mode-name";
import { PassionLevels } from "../enum/passion-level";

export interface IHobbies extends mongoose.Document {
  name: string;
  passionLevel: PassionLevels;
  year: number;
}

const HobbiesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    passionLevel: { type: PassionLevels, required: true },
    year: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Hobbies = mongoose.model<IHobbies>(MODELS.HOBBIES, HobbiesSchema);

export default Hobbies;
