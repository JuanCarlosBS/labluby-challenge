/* eslint-disable class-methods-use-this */
import Follow from '../models/Follow';
import User from '../models/User';

class FollowController {
  async show(request, response) {
    const { id } = request.params;
    const follow = await Follow.findByPk(id);

    return response.json(follow);
  }

  async index(request, response) {
    const follow = await Follow.findAll();

    if (!follow) {
      return response.status(401).json({ error: 'not found' });
    }

    return response.json(follow);
  }

  async store(request, response) {
    const { idFollower, idFollowing } = request.body;

    if (idFollowing === idFollower) {
      return response.status(401).json({ error: 'not authorized' });
    }

    const follower = await User.findOne({
      where: { id: idFollower },
    });

    if (!follower) {
      return response.status(401).json({ error: 'not found' });
    }

    const following = await User.findOne({
      where: { id: idFollowing },
    });

    if (!following) {
      return response.status(404).json({ error: 'not found' });
    }

    const follow = await Follow.findOne({
      where: { user_follower_id: idFollower, user_following_id: idFollowing },
    });

    if (follow) {
      return response.status(401).json({ error: 'not authorized' });
    }

    const followCreated = await Follow.create({
      user_follower_id: idFollower,
      user_following_id: idFollowing,
    });
    return response.json(followCreated);
  }

  async update(request, response) {
    const { id } = request.params;

    const follow = await Follow.findOne({ where: { id } });

    if (!follow) {
      return response.status(404).json({ error: 'Follow not found' });
    }

    const { idFollower, idFollowing } = request.body;

    const followAlreadyTaken = await Follow.findOne({
      where: { user_follower_id: idFollower, user_following_id: idFollowing },
    });

    if (followAlreadyTaken) {
      return response.status(401).json({ error: 'not authorized' });
    }

    const { active } = await follow.update({
      user_follower_id: idFollower,
      user_following_id: idFollowing,
    });

    return response.json(follow);
  }

  async delete(request, response) {
    const { idFollower, idFollowing } = request.body;

    const user = await Follow.findOne({
      where: { user_follower_id: idFollower, user_following_id: idFollowing },
    });

    if (!user) {
      return response.status(404).json({ error: 'Follow not found' });
    }
    await Follow.destroy({
      where: { user_follower_id: idFollower, user_following_id: idFollowing },
    });

    return response.json({ message: 'Follow deleted' });
  }
}

export default new FollowController();
