import express from 'express'
import { addToWatchlist, removeFromWatchList, updateWatchlist, getWatchlist } from '../controllers/watchlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { addToWatchlistSchema, updateWatchlistSchema } from '../validators/watchlistValidators.js';
const router = express.Router()

router.use(authMiddleware)

router.post("/", validateRequest(addToWatchlistSchema) ,addToWatchlist);

router.delete("/:id",removeFromWatchList);

router.put("/:id", validateRequest(updateWatchlistSchema),updateWatchlist);

router.get("/", getWatchlist);


export default router;


