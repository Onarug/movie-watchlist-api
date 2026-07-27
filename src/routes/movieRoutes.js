import express from 'express'
import { addToMovieDB } from '../controllers/movieController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { addToMovieDBSchema } from '../validators/movieValidators.js';
const router = express.Router()

router.use(authMiddleware)

router.post("/", validateRequest(addToMovieDBSchema),addToMovieDB );

export default router;


