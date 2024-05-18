import express from "express";
import { getPoints } from "../controller/point.controller.js";
const router=express.Router();

router.get("/getPoints/:id",getPoints);

export default  router;