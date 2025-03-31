const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});


//testing the connection
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
   
  } catch (error) {
    console.error('Database sync error:', error);
  }
};

syncDatabase();

module.exports = sequelize;
