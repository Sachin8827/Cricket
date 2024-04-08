
import express from 'express';
import { updatePlayerProfile } from '../controller/player.controller.js';

const router = express.Router();

router.put('/:playerId', updatePlayerProfile);

export default router;
