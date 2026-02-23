import express from 'express';
import {getdrinksCon} from '../controllers/drinksCon.js';

const router = express.Router();

router.get('/drinks', getdrinksCon)

export default router;
