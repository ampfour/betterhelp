const config = require('../config/config')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    lastName: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      notEmpty: true
    }
  }, {
    getterMethods: {
      fullName () {
        return this.firstName + ' ' + this.lastName
      }
    }
  })

  return User
}
