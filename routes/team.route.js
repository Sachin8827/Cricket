import express from 'express'
import { createTeam, viewTeam,teamList, sendRequest, trailRequest, getUserRequest, applyForTournament } from '../controller/team.controller.js';
import multer from "multer";
const upload = multer({dest:"public/images"});
const router  = express.Router();

router.post('/create',upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]),createTeam);
router.get('/viewteam/:id', viewTeam);
router.get('/teamlist', teamList);
router.post('/sendrequest', sendRequest);
router.post('/trailrequest', trailRequest);
router.get('/getuser', getUserRequest);
router.post('/apply', applyForTournament)

export default router;