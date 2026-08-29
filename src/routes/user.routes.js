import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';

const router = Router();

router.route('/register').get(registerUser); // GET request

export default router;
