import express from 'express';
import { getmealsCon } from  '../controllers/mealsCon.js';

const router = express.Router();

router.get('/meals', getmealsCon); 

export default router;
