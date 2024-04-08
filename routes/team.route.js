import express from 'express'
import { CreateTeam, viewTeam,teamList, sendRequest, trailRequest, getUserRequest } from '../controller/Team.controller.js';

const router  = express.Router();

router.post('/create', CreateTeam);
router.get('/viewteam/:id', viewTeam);
router.get('/teamlist', teamList);
router.post('/sendrequest', sendRequest);
router.post('/trailrequest', trailRequest);
router.get('/getuser', getUserRequest);

export default router;