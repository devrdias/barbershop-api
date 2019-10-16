import { Router } from 'express';
import ScheduleController from '../app/controllers/ScheduleController';

const router = new Router();

router.get('/', ScheduleController.index);

export default router;
