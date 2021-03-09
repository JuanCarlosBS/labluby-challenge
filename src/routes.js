import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = Router();

routes.get('/users/:username', UserController.show);
routes.get('/users/', UserController.index);

routes.post('/users', UserController.store);

routes.put('/users/:id', UserController.update);

routes.delete('/users/:id', UserController.delete);

export default routes;
