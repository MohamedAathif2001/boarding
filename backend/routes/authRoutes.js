import express from 'express';

import { getUser, login, logout, signup } from '../controllers/authController.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/me', protectRoute, getUser)
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;
