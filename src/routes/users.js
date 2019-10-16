import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import authMiddleware from '../app/middlewares/auth';

const router = new Router();

/* POST users listing = store action method */
router.post('/', UserController.store);

// global middleware
router.use(authMiddleware);
router.put('/', UserController.update);

export default router;
