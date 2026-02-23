
import express from 'express';

import {
getHomeInfo,
} from '../controllers/homeControllers.js';

const router = express.Router();

router.get('/data', getHomeInfo);
//router.get('/:id', getEmployeeById);
//router.post('/', addEmployee);
//router.patch('/:id', updateEmployee);
//router.delete('/:id', deleteEmployee);

export default router;