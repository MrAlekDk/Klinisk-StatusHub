import { Router } from 'express';
import { authcontroller } from '../controllers/authController.js';

const router = Router();

router.post('/login', authcontroller.login);

export default router;