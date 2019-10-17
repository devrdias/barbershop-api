import { Router } from 'express';
import ProviderController from '../app/controllers/ProviderController';
import AvailableController from '../app/controllers/AvailableController';

const router = new Router();

router.get('/', ProviderController.index);
router.get('/:providerId/available', AvailableController.index);

export default router;
