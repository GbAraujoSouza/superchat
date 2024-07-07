import { Router } from 'express'

import { messageController } from '../controllers/message.controller';

const router = Router();

const baseUrl = '/messages';

router.post(`${baseUrl}/send/:id`, messageController.sendMessage)

export default router;