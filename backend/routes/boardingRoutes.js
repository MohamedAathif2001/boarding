import express from 'express';
import { createBoarding, deleteBoarding, getAllBoardings, getUserBoarding, updateBoarding } from '../controllers/boardingController.js';
import { protectBoardingRoute } from '../middleware/ProtectBoardingRoute.js';
import { protectRoute } from '../middleware/Authorization.js';
import { protectRoute } from '../middleware/Authorization.js'

const router = express.Router();

router.post('/create',protectRoute, protectBoardingRoute, createBoarding);
router.post('/delete/:id',protectRoute, protectBoardingRoute, deleteBoarding);
router.get('/all', protectRoute, getAllBoardings);
router.get('/get/:id',protectRoute,protectBoardingRoute,getUserBoarding)
router.patch('/update/:id', protectRoute, protectBoardingRoute, updateBoarding)

export default router;