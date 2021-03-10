import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AuthenticationController from './app/controllers/AuthenticationController';
import FollowController from './app/controllers/FollowController';

const routes = Router();

routes.get('/users/:username', UserController.show);
routes.get('/users/', UserController.index);
routes.get('/authentication', AuthenticationController.index);
routes.get('/follow/:id', FollowController.show);
routes.get('/follow', FollowController.index);

routes.post('/users', UserController.store);
routes.post('/authentication', AuthenticationController.store);
routes.post('/follow', FollowController.store);

routes.put('/users/:id', UserController.update);
routes.put('/follow/:id', FollowController.update);

routes.delete('/users/:id', UserController.delete);
routes.delete('/follow', FollowController.delete);

export default routes;
