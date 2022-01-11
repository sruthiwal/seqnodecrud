'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        static associate(models) {
            // define association here
            this.belongsTo(models.Person, {
                foreignKey: 'id'
            });
        }
    };
    Item.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        person_id: {
            type: DataTypes.UUID,
        },
        name_item: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Item',
        tableName: 'Item'
    });
    return Item;
};