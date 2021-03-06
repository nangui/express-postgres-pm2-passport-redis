'use strict';

const fs = require('fs');
const path = require('path');
const { DataTypes, Sequelize } = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/config');
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
})

    sequelize.authenticate()
      .then(function () {
        console.log('Connection has been established successfully.');
      })
      .catch(function (error) {
        console.error('Unable to connect to the database:', error);
      })


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
