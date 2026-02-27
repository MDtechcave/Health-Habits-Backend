import express from 'express';
import { 
    getmealsCon,
    addMealCon,
    deleteMealCon
 } from  '../controllers/mealsCon.js';

const router = express.Router();

router.get('/meals', getmealsCon); 
router.post('/meals', addMealCon);

router.delete('/meals/:id', deleteMealCon);

export default router;
