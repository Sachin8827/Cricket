
import express from 'express';
import { addPlayingStyle } from '../controller/playingStyle.controller.js';

const router = express.Router();

router.post('/', addPlayingStyle);

export default router;
