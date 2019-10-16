import { Router } from 'express';
import multer from 'multer';
import FileController from '../app/controllers/FileController';
import multerConfig from '../config/multer';

const upload = multer(multerConfig);

const router = new Router();

router.post('/', upload.single('file'), FileController.store);

export default router;
