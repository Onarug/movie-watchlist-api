import express from 'express'
import { addToMovieDB,showMovieDB,getMovieById } from '../controllers/movieController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { addToMovieDBSchema } from '../validators/movieValidators.js';

const router = express.Router()

router.use(authMiddleware)

router.post("/", validateRequest(addToMovieDBSchema),addToMovieDB );
router.get("/",showMovieDB);
router.get("/:id", getMovieById);

export default router;


