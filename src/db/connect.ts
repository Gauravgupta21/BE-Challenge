import mongoose from "mongoose";
import Hobbies from "../model/hobbies.model";
import User from "../model/user.model";
async function connect() {
  const uri: string = environment.dbUrl as string;
  return await mongoose.connect(uri, { replicaSet: "rs" }, (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(`Connecting to MONGO`);
      Hobbies.createCollection();
      User.createCollection();
    }
  });
}

export default connect;
