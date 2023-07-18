import express from 'express';
import { getAll ,remove, activeUser} from '../controllers/user';
const router = express.Router();
router.get('/users', getAll);
router.delete('/users/:id', remove);
// router.put('/users/:id', updateUser);
router.get('/users/:id', activeUser);

export default router;
