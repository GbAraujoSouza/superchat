import { Router } from 'express'

import { userController } from '../controllers/user.controller';

const router = Router();

const baseUrl = '/user';

router.post(`${baseUrl}/create`, userController.create);

export default router;