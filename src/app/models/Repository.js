import Sequelize, { Model } from 'sequelize';

class Repository extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.STRING,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        public_repository: Sequelize.BOOLEAN,
        slug: Sequelize.STRING,
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

export default Repository;
