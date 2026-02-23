
import express from 'express';
import { 
  getGoals, 
  getMealsByGoal, 
  getMealById 
} from '../controllers/goalCon.js';

const router = express.Router();

router.get('/', getGoals);
router.get('/:goal/meals', getMealsByGoal);
router.get('/meal/:id', getMealById);

export default router;