import { Router } from 'express';
import { authenticateAdmin } from '../middleware/auth';
import { createMatch, updateMatch, deleteMatch, getMatches } from '../controllers/match.controller';

const router = Router();
router.use(authenticateAdmin);
router.get('/matches', getMatches);
router.post('/matches', createMatch);
router.put('/matches/:id', updateMatch);
router.delete('/matches/:id', deleteMatch);
// predictions, premium picks, users, subscriptions, settings, etc.
export default router;
