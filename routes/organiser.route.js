import express from "express";
import { Register, SignIn, Update } from "../controller/organiser.controller.js";
import {body} from "express-validator";

const router =express.Router();
router.post("/register",body("name","name is required").notEmpty(),
body("email","email is required").notEmpty(),
body("email","Invalid Email").isEmail(),
body("mobile","mobile no. is required").notEmpty(),
body("mobile","mobile no. should be numeric").isNumeric(),
body("mobile","mobile contains 10 numbers").isLength({min:10,max:10}),
body("password","password is required").notEmpty(),
body("password","password have minimum 6 letters").isLength({min:6}),Register);

router.post("/SignIn",SignIn);

router.post("/Update",body("name","name is required").notEmpty(),
body("email","email is required").notEmpty(),
body("email","Invalid Email").isEmail(),
body("mobile","contact is required").notEmpty(),
body("mobile","mobile have 10 digits only").isLength({min:10,max:10}),
body("mobile","only letters are allowed").isNumeric(),Update);

export default router;
