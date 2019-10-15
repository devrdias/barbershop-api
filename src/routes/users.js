import { Router } from 'express';
import UserController from '../app/controllers/UserController';

const router = new Router();

/* POST users listing = store action method */
router.post('/', UserController.store);

export default router;
