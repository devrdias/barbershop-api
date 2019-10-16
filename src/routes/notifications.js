import { Router } from 'express';
import NotificationController from '../app/controllers/NotificationController';

const router = new Router();

router.get('/', NotificationController.index);
router.put('/:id', NotificationController.update);

export default router;
