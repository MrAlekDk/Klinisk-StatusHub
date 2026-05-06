import { Router } from 'express';
import { authcontroller } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/is-authenticated', authMiddleware, authcontroller.getAuthenticationStatus)
router.post('/login', authcontroller.login);
router.post('/logout', authMiddleware, authcontroller.logout);

export default router;