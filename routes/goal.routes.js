
import express from 'express';
import { getgoalCon } from '../controllers/goalCon.js';

const router = express.Router();

router.get('/goal', getgoalCon);

export default router;