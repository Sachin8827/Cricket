
import express from 'express';
import { addPlayingStyle } from '../controller/playingStyle.controller.js';

const router = express.Router();

router.post('/addstyle', addPlayingStyle);

export default router;
