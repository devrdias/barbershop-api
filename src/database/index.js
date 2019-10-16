import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    console.log('Sequelize - connecting to DB');
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // call init for every model passing the connection as parameter
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
