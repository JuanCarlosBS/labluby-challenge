/* eslint-disable class-methods-use-this */
import User from '../models/User';

class UserController {
  async show(request, response) {
    const { username } = request.params;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const { id, name, email, location, avatar, bio } = user;

    return response.json({
      id,
      name,
      email,
      location,
      avatar,
      bio,
    });
  }

  async index(request, response) {
    const user = await User.findAll();

    return response.json(user);
  }

  async store(request, response) {
    const { name, email, location, avatar, username, bio } = request.body;

    const useremailcheck = await User.findOne({ where: { email } });

    if (useremailcheck) {
      return response.status(401).json({ error: 'not authorized' });
    }

    const usernamecheck = await User.findOne({ where: { email } });

    if (usernamecheck) {
      return response.status(401).json({ error: 'not authorized' });
    }

    const { id } = await User.create({
      name,
      email,
      location,
      avatar,
      username,
      bio,
    });
    return response.json({
      id,
      name,
      email,
      location,
      avatar,
      username,
      bio,
    });
  }

  async update(request, response) {
    const { id } = request.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const { name, email, location, avatar, username, bio } = request.body;

    const emailAlreadyTaken = await User.findOne({
      where: { email },
    });

    if (emailAlreadyTaken) {
      return response.status(401).json({ error: 'not authorized' });
    }

    const usernameAlreadyTaken = await User.findOne({
      where: { email },
    });

    if (usernameAlreadyTaken) {
      return response.status(401).json({ error: 'not authorized' });
    }

    const { active } = await user.update({
      name,
      email,
      location,
      avatar,
      username,
      bio,
    });

    return response.json({
      name,
      email,
      location,
      avatar,
      username,
      bio,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }
    await User.destroy({
      where: { id },
    });

    return response.json({ message: 'user deleted' });
  }
}

export default new UserController();
