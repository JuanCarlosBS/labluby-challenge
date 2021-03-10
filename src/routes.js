import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AuthenticationController from './app/controllers/AuthenticationController';

const routes = Router();

routes.get('/users/:username', UserController.show);
routes.get('/users/', UserController.index);
routes.get('/authentication', AuthenticationController.index);

routes.post('/users', UserController.store);
routes.post('/authentication', AuthenticationController.store);

routes.put('/users/:id', UserController.update);

routes.delete('/users/:id', UserController.delete);

export default routes;
