import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { MovieRouter } from '../modules/movie/movie.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/movies',
    routes: MovieRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
