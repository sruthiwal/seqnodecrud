'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    static associate(models) {
      // define association here
      this.hasOne(models.Image, {
        foreignKey: 'id'
      });
      this.hasMany(models.Item, {
        foreignKey: 'person_id'
      });
    }
  };
  Person.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: DataTypes.STRING(128),
    age: DataTypes.INTEGER,
    gender: DataTypes.ENUM('female', 'male'),
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Person',
    tableName: 'Person'
  });
  return Person;
};