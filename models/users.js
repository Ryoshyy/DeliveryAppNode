import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    phone:{
      type: String,
      required: true,
      unique: true,
    },
    address:{
      type: String,
      required: true,     
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);