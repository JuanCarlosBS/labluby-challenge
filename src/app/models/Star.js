import Sequelize, { Model } from 'sequelize';

class Star extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        repository_id: Sequelize.INTEGER,
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
    this.belongsTo(models.Repository, {
      foreign_key: 'repository_id',
      as: 'repositories',
    });
  }
}

export default Star;
