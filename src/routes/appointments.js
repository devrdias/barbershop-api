import { Router } from 'express';
import AppointmentController from '../app/controllers/AppointmentController';

const router = new Router();

router.post('/', AppointmentController.store);

export default router;
