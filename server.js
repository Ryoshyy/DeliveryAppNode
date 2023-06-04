import express, { json } from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";

import { registerValidation, loginValidation, projectCreateValidation } from "./validations.js";
import { userController, productController, orderController } from "./controllers/controllers.js";
import { checkAuth, handleValitationErrors } from "./utils/utils.js";



mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://romantonyk:romik1649785230341364@cluster0.c7q6vtk.mongodb.net/DeliveryApp"
  )
  .then(() => console.log("Db work"))
  .catch((err) => console.log("Db error", err));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const app = express();
const upload = multer({ storage });



app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors()) 

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Server",
  });
});

app.put(
  "/products",
  productController.getProductsByIds
);

app.post(
  "/products",  
  productController.create
);
app.post(
  "/user",  
  userController.createUser
);
app.post(
  "/order",  
  orderController.addOrder
);
app.get(
  "/companies",  
  productController.getCompanies
);
app.get(
  "/products",  
  productController.getAll
);
app.get(
  "/products/:companyId",  
  productController.getCompanyProducts
);



app.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server work");
});

