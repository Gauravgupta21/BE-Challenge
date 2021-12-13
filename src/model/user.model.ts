import mongoose from "mongoose";
import MODELS from '../constant/mode-name';

export interface IUser extends mongoose.Document {
  name: string;
  hobbies: mongoose.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    hobbies: [{ type: mongoose.Schema.Types.ObjectId, ref: MODELS.HOBBIES }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>(MODELS.USER, UserSchema);
User.createCollection();
export default User;
