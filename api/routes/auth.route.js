import exprss from 'express'
import { signup } from '../controllers/auth.controller.js';

const router = exprss.Router();

router.post('/signup', signup)

export default router;