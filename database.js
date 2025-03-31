const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync(); // Sync tables
    console.log('Database synced');
  } catch (error) {
    console.error('Database sync error:', error);
  }
};

syncDatabase();

module.exports = sequelize;
