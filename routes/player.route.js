
import  express from "express";
import {resetPassword, retrievePassword, acceptRequest, rejectRequest, getAllPlayer, signUp,signIn,updateProfile,updatePlayerProfile } from "../controller/player.controller.js";
import {body} from "express-validator";
import multer from "multer";
const upload=multer({dest:"public/images"});
const router  = express.Router();

router.post("/signup",body("name","playerName is required").notEmpty(),
body("password","password is required").notEmpty(),
body("password","password should contain at least 8 letter").isLength({min: 8}),
body("email","email is required").notEmpty(),
body("email","Invalid email id").isEmail(),
body("mobile","mobile is required").notEmpty(),
body("mobile","only digit allowed").isNumeric(),
body("age","player age required").notEmpty(),
body("height","player height required ").notEmpty(),
body("type","player type is required").notEmpty(),signUp);
router.post("/update-profile",upload.single("image"),updateProfile);
router.put('/:playerId', updatePlayerProfile);
router.post("/signIn",signIn);


router.post('/forgot', retrievePassword);
router.post('/accept', acceptRequest);
router.post('/reject', rejectRequest);
router.get('/getallplayer', getAllPlayer);
router.get('/getplayerinfo/:id',)
router.post("/forgotPassword",retrievePassword);
router.post("/resetPassword",resetPassword);
export default router;

