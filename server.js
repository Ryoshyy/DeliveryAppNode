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
const port = 8000;



app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors()) 

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Server",
  });
});

//USER
// app.get("/auth/me", checkAuth, userController.getMe);
// app.post(
//   "/auth/login",
//   loginValidation,
//   handleValitationErrors,
//   userController.login
// );
// app.post(
//   "/auth/register",
//   registerValidation,
//   handleValitationErrors,
//   userController.register
// );
// CART
// app.post("/cart",checkAuth, cartController.create)

//COMPANY
// app.get("/companies",companyController.getAll)
// app.post("/companies",companyController.create)

//PROJECT
// app.get("/projects", productController.getAll);
// app.get("/projects/:id", productController.getOne);
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

// app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
//   res.json({
//     url: `/uploads/${req.file.originalname} `,
//   });
// });
// app.delete("/projects/:id", checkAuth, productController.remove);
// app.put(
//   "/projects/:id",
//   checkAuth,
//   projectCreateValidation,
//   handleValitationErrors,
//   productController.update
// );

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server work");
});
