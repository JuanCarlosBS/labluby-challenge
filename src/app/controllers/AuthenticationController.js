/* eslint-disable class-methods-use-this */
import Token from '../models/Token';
import User from '../models/User';

class AuthenticationController {
  async index(request, response) {
    const token = await Token.findAll();

    return response.json(token);
  }

  async store(request, response) {
    const { id } = request.body;

    const user = await User.findByPk(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }
    const token = await Token.findOne({ where: { user_id: id } });

    if (token) {
      return response.status(401).json({ error: 'not authorized' });
    }

    const tokencreated = await Token.create({ user_id: id });
    return response.json({ message: 'sim' });
  }
}

export default new AuthenticationController();
