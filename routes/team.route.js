import express from 'express'
import { createTeam, viewTeam,teamList, sendRequest, trailRequest, getUserRequest } from '../controller/Team.controller.js';

const router  = express.Router();

router.post('/create', createTeam);
router.get('/viewteam/:id', viewTeam);
router.get('/teamlist', teamList);
router.post('/sendrequest', sendRequest);
router.post('/trailrequest', trailRequest);
router.get('/getuser', getUserRequest);

export default router;