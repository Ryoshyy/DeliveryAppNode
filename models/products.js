import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,      
    },
    description: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    companyId:{
      type: String,
      required: true,
    },
    companyName:{
      type: String,
      required: true,
    },
    
    
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);