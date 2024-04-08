import express from 'express';
import { applyForTournament } from '../controller/team.controller.js';

const router = express.Router();

router.post('/teams/apply', applyForTournament);

export default router;
