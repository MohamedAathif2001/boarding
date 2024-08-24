import express from 'express';
import { createBoarding, deleteBoarding, getAllBoardings, getUserBoarding, updateBoarding } from '../controllers/boardingController.js';
import { protectBoardingRoute } from '../middleware/protectBoardingRoute.js';
import { protectRoute } from '../middleware/Authorization.js'

const router = express.Router();

router.post('/create',protectBoardingRoute, createBoarding);
router.post('/delete/:id', protectBoardingRoute, deleteBoarding);
router.get('/all', protectRoute, getAllBoardings);
router.get('/get/:id',protectBoardingRoute,getUserBoarding)
router.patch('/update/:id',protectBoardingRoute,updateBoarding)

export default router;