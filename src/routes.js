import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AuthenticationController from './app/controllers/AuthenticationController';
import FollowController from './app/controllers/FollowController';
import RepositoryController from './app/controllers/RepositoryController';
import StarController from './app/controllers/StarController';

const routes = Router();

routes.get('/users/:username', UserController.show);
routes.get('/users/', UserController.index);
routes.get('/authentication', AuthenticationController.index);
routes.get('/follows/:id', FollowController.show);
routes.get('/follows', FollowController.index);
routes.get('/repositories/:id', RepositoryController.show);
routes.get('/repositories', RepositoryController.index);
routes.get('/stars/:id', StarController.show);
routes.get('/stars', StarController.index);

routes.post('/users', UserController.store);
routes.post('/authentication', AuthenticationController.store);
routes.post('/follows', FollowController.store);
routes.post('/repositories', RepositoryController.store);
routes.post('/stars', StarController.store);

routes.put('/users/:id', UserController.update);
routes.put('/follows/:id', FollowController.update);
routes.put('/repositories/:id', RepositoryController.update);
routes.put('/stars/:id', StarController.update);

routes.delete('/users/:id', UserController.delete);
routes.delete('/follows', FollowController.delete);
routes.delete('/repositories/:id', RepositoryController.delete);
routes.delete('/stars/:id', StarController.delete);

export default routes;
