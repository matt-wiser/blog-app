const {Model, DataTypes} = require("sequelize");
const db = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
    checkPassword(password){
        return bcrypt.checkPassword(loginPass, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            },
            async beforeUpdate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            }
        }
    },
    {
        db,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user"
    }
)

module.exports = User;