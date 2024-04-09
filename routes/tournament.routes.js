import express from 'express';
import { createTournament, viewTournaments , viewAllTournaments ,updateTournament} from '../controller/tournament.controller.js';
const router = express.Router();

router.post('/tournaments', createTournament);
router.get('/organizer/:organizerId/tournaments', viewTournaments);
router.get('/tournaments/viewAllTournaments', viewAllTournaments);
router.post('/tournaments/:tournamentId/update', updateTournament);

// router.get('/tournaments', getTournaments);

export default router;
