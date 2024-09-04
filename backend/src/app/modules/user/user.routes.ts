import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/:id', UserController.getSingleUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

router.patch('/addTo/:id', auth(), UserController.addToWatchList);
router.patch('/removeFrom/:id', auth(), UserController.removeFromWatchList);

router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
