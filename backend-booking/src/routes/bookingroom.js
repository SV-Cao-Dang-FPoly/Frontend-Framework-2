import express from 'express';

import { create ,get, getAll, remove} from '../controllers/bookingroom';

const router = express.Router();
router.post('/bookingroom', create);
router.get('/bookingroom/:email', get);
router.get('/bookingroom', getAll);
router.delete('/bookingroom/:id', remove);

export default router;
