import { Router } from 'express';
import { getAllNotes } from '../controllers/notesControllers';

const router = Router();

router.get('/notes', getAllNotes);
router.get('/notes/:notesId');

export default router;
