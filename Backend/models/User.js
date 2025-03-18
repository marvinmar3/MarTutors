const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');

class User extends Model {
  async matchPassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Por favor introduce un email válido'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: 'La contraseña debe tener al menos 6 caracteres'
        }
      }
    },
    userType: {
      type: DataTypes.ENUM('estudiante', 'egresado', 'profesor'),
      allowNull: false
    },
    faculty: {
      type: DataTypes.STRING,
      allowNull: false
    },
    career: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);

// Definir relaciones
User.associate = (models) => {
  User.belongsToMany(models.Subject, {
    through: 'UserSubjectsTeaching',
    as: 'subjectsTeaching',
    foreignKey: 'user_Id'
  });

  User.belongsToMany(models.Subject, {
    through: 'UserSubjectsLearning',
    as: 'subjectLearning',
    foreignKey: 'user_Id'
  });
};

// Middleware para hashear la contraseña antes de guardarla
User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

module.exports = User;