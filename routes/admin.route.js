import express from "express";
import {profile, signIn, signUp, updateProfile, updateScore} from "../controller/admin.controller.js";

const router=express.Router();

router.post("/signIn",signIn);
router.get("/profile/:id",profile);
router.post("/signUp",signUp);
router.patch("/updateProfile/:id",updateProfile);
router.patch("/updateScore", updateScore);

export default router;
