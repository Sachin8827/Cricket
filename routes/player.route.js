
import  express from "express";
import {resetPassword, retrievePassword, acceptRequest, rejectRequest, getAllPlayer, signUp,signIn,updateProfile,updatePlayerProfile, retriveByStyle, getPlayerInfo } from "../controller/player.controller.js";
import {body} from "express-validator";
import multer from "multer";
const upload=multer({dest:"public/images"});
const router  = express.Router();

router.post("/signup",upload.single("image"),signUp);
router.post("/update-profile",upload.single("image"),updateProfile);
router.put('/:playerId', updatePlayerProfile);
router.post("/signIn",signIn);


router.post('/forgot', retrievePassword);
router.post('/accept', acceptRequest);
router.post('/reject', rejectRequest);
router.get('/getallplayer', getAllPlayer);
router.get('/getplayerinfo/:id',getPlayerInfo)
router.post("/forgotPassword",retrievePassword);
router.post("/resetPassword",resetPassword);
router.get("/getStyle/:style", retriveByStyle)
export default router;

