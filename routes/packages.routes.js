import express from 'express';
import {getpackagesCon} from '../controllers/packagesCon.js';

const router = express.Router ();

router.get('/packages',getpackagesCon)

export default router;