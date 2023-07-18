import express from 'express';

import { create, get, getAll, remove, update } from '../controllers/room';
import { checkPermission } from '../middlewares/checkPermission';

const router = express.Router();
router.get('/rooms', getAll);
router.get('/rooms/:id', get);
router.post('/rooms', create);
router.put('/rooms/:id', update);
router.delete('/rooms/:id', remove);

export default router;
