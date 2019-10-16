import { Router } from 'express';
import ProviderController from '../app/controllers/ProviderController';

const router = new Router();

router.get('/', ProviderController.index);

export default router;
