import express from 'express';
import { createTournament, viewTournaments , viewAllTournaments ,updateTournament, updateSchedule, getTournamentsById, getTournaments} from '../controller/tournament.controller.js';
const router = express.Router();
import multer from 'multer';
const upload = multer({dest: "public/images/"});
router.post('/create', createTournament);
router.get('/organizer/:organizerId/tournaments', viewTournaments);
router.get('/viewAllTournaments', viewAllTournaments);
router.post('/tournaments/:tournamentId/update', updateTournament);
router.get('/getTournament/:tournamentId', getTournamentsById)
router.post('/updateSchedule/:tid',upload.single('schedule'), updateSchedule);
router.get('/getAllTournament', getTournaments);

export default router;
