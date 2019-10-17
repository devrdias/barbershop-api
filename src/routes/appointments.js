import { Router } from 'express';
import AppointmentController from '../app/controllers/AppointmentController';

const router = new Router();

router.get('/', AppointmentController.index);
router.post('/', AppointmentController.store);
router.delete('/:id', AppointmentController.delete);

export default router;
