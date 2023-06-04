import { body } from "express-validator";

export const loginValidation = [
    body("email", "Invalid email").isEmail(),
    body("password", "Invalid password").isLength({min:6}),
]

export const registerValidation = [
    body("email", "Invalid email").isEmail(),
    body("password", "Invalid password").isLength({min:6}),
    body("fullname", "Invalid fullname").isLength({min:4}),
    body("avatarUrl", "Invalid avatarUrl").optional().isURL(),
]

export const projectCreateValidation = [
    body("title","Set project title").isLength({min:4}).isString(),
    body("imageUrl", "Set project img").isString(),
    body("description", "Set project description").isString(),
    body("technology", "Set project technology").isString(),
    body("price", "Set project price").isNumeric(),
    body("count", "Set project count").isNumeric(),

]

export const orderCreateValidation = [
    body("name","Set project title").isLength({min:4}).isString(),
    body("email", "Set project img").isLength({min:4}).isEmail(),
    body("phone", "Set project description").isLength({min:4}).isMobilePhone(),
    body("address", "Set project technology").isString(),
]