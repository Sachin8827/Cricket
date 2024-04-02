import  express from "express";
import { retrievePassword, acceptRequest, rejectRequest, getAllPlayer } from "../controller/player.controller.js";
const router  = express.Router();

router.post('/forgot', retrievePassword);
router.post('/accept', acceptRequest);
router.post('/reject', rejectRequest);
router.get('/getallplayer', getAllPlayer);
router.get('/getplayerinfo/:id',)

export default router;