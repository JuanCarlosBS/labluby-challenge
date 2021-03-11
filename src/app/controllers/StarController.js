/* eslint-disable class-methods-use-this */
import Star from '../models/Star';
import Repository from '../models/Repository';
import User from '../models/User';

class StarController {
  async show(request, response) {
    const { id } = request.params;
    const star = await Star.findAll({ where: { repository_id: id } });

    if (!star) {
      return response.status(401).json({ error: 'Star not found' });
    }

    return response.json(star);
  }

  async index(request, response) {
    const star = await Star.findAll();

    if (!star) {
      return response.status(401).json({ error: 'Star not found' });
    }

    return response.json(star);
  }

  async store(request, response) {
    const { userID, repositoryID } = request.body;

    const user = await User.findOne({
      where: { id: userID },
    });

    if (!user) {
      return response.status(401).json({ error: 'not found' });
    }

    const repository = await Repository.findOne({
      where: { id: repositoryID },
    });

    if (!repository) {
      return response.status(404).json({ error: 'not found' });
    }

    const star = await Star.findOne({
      where: { user_id: userID, repository_id: repositoryID },
    });

    if (star) {
      return response.status(401).json({ error: 'not authorized' });
    }

    const starCreated = await Star.create({
      user_id: userID,
      repository_id: repositoryID,
    });
    return response.json(starCreated);
  }

  async update(request, response) {
    const { id } = request.params;

    const star = await Star.findOne({ where: { id } });

    if (!star) {
      return response.status(404).json({ error: 'Star not found' });
    }

    const { userID, repositoryID } = await request.body;

    const starAlreadyTaken = await Star.findOne({
      where: { user_id: userID, repository_id: repositoryID },
    });

    if (starAlreadyTaken) {
      return response.status(401).json({ error: 'not authorized' });
    }

    const user = await User.findOne({
      where: { id: userID },
    });

    if (!user) {
      return response.status(401).json({ error: 'not found' });
    }

    const repository = await User.findOne({
      where: { id: repositoryID },
    });

    if (!repository) {
      return response.status(404).json({ error: 'not found' });
    }

    const { active } = await star.update({
      user_id: userID,
      repository_id: repositoryID,
    });

    return response.json({ star });
  }

  async delete(request, response) {
    const { id } = request.params;

    const star = await Star.findOne({
      where: { id },
    });

    if (!star) {
      return response.status(404).json({ error: 'Star not found' });
    }

    await Star.destroy({
      where: { id },
    });

    return response.json({ message: 'Star deleted' });
  }
}

export default new StarController();
