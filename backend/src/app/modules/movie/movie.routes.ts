import express from 'express';
import { MovieController } from './movie.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create', auth(), MovieController.createMovie);

router.get('/:id', MovieController.getSingleMovie);
router.patch('/:id', MovieController.updateMovie);
router.delete('/:id', MovieController.deleteMovie);

router.get('/', MovieController.getAllMovies);

export const MovieRouter = router;
