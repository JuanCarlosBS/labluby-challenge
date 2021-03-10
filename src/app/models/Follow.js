import Sequelize, { Model } from 'sequelize';

class Follow extends Model {
  static init(sequelize) {
    super.init(
      {
        user_follower_id: Sequelize.STRING,
        user_following_id: Sequelize.STRING,
      },
      { sequelize },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreign_key: 'user_follower_id',
      as: 'user',
    });
    this.belongsTo(models.User, {
      foreign_key: 'user_following_id',
      as: 'user',
    });
  }
}

export default Follow;
