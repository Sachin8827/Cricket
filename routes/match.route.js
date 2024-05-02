import  express from "express";
import { insertScore } from "../controller/match.controller.js";

const router  = express.Router();

router.post('/insert-score', insertScore)
export default router