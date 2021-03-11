/* eslint-disable class-methods-use-this */
import slugify from 'slugify';

import Repository from '../models/Repository';
import User from '../models/User';

class RepositoryController {
  async show(request, response) {
    const { id } = request.params;
    const repository = await Repository.findAll({ where: { user_id: id } });

    if (!repository) {
      return response.status(401).json({ error: 'Repository not found' });
    }

    return response.json(repository);
  }

  async index(request, response) {
    const repository = await Repository.findAll({
      where: { public_repository: true },
    });

    if (!repository) {
      return response.status(401).json({ error: 'Repository not found' });
    }

    return response.json(repository);
  }

  async store(request, response) {
    const { userID, name, description, publicRep } = await request.body;

    const user = await User.findOne({
      where: { id: userID },
    });

    if (!user) {
      return response.status(401).json({ error: 'User not found' });
    }

    const repository = await Repository.findOne({
      where: { user_id: userID, name },
    });

    if (repository) {
      return response.status(401).json({ error: 'not authorized' });
    }

    const slug = slugify(`${user.name}-${name}`);

    const repositoryCreated = await Repository.create({
      user_id: userID,
      name,
      description,
      public_repository: publicRep,
      slug,
    });
    return response.json(repositoryCreated);
  }

  async update(request, response) {
    const { id } = request.params;

    const repository = await Repository.findOne({ where: { id } });

    if (!repository) {
      return response.status(404).json({ error: 'Repository not found' });
    }

    const { userID, name, description, publicRep } = await request.body;

    const nameAlreadyTaken = await Repository.findOne({
      where: { user_id: userID, name },
    });

    if (nameAlreadyTaken) {
      return response.status(401).json({ error: 'not authorized' });
    }

    const user = await User.findOne({
      where: { id: userID },
    });

    const slug = slugify(`${user.name}-${repository.name}`);

    const { active } = await repository.update({
      user_id: userID,
      name,
      description,
      public_repository: publicRep,
      slug,
    });

    return response.json(repository);
  }

  async delete(request, response) {
    const { id } = request.params;

    const repository = await Repository.findOne({
      where: { id },
    });

    if (!repository) {
      return response.status(404).json({ error: 'Repository not found' });
    }
    await Repository.destroy({
      where: { id },
    });

    return response.json({ message: 'Repository deleted' });
  }
}

export default new RepositoryController();
