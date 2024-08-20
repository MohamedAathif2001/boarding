import express from 'express';
import { createBoarding, deleteBoarding, getAllBoardings } from '../controllers/boardingController.js';
import { protectBoardingRoute } from '../middleware/protectBoardingRoute.js';
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router();

router.post('/create',protectBoardingRoute, createBoarding);
router.post('/delete/:id', protectBoardingRoute, deleteBoarding);
router.get('/all', protectRoute, getAllBoardings);

export default router;