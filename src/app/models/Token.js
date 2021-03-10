import Sequelize, { Model } from 'sequelize';

class Token extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.STRING,
      },
      { sequelize },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreign_key: 'user_id',
      as: 'users',
    });
  }
}

export default Token;
