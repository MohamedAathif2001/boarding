import express from 'express';
import { createBoarding } from '../controllers/boardingController';

const router = express.Router();

router.post('/create', createBoarding);

export default router;