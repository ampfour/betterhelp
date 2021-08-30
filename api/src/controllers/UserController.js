const { User } = require('../models')
const db = require('../models')
const { QueryTypes } = require('sequelize')

module.exports = {
  async getUsers (req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        order: [
          [ 'lastName', 'ASC' ],
          [ 'firstName', 'ASC' ]
        ]
      })

      res.send(users)
    } catch (err) {
      // throw err
      res.status(400).send({
        error: 'There are not users in system.'
      })
    }
  },

  async getActiveUsers (req, res) {
    try {
      const users = await db.sequel.query('SELECT * FROM `Users` WHERE `active` = true', {
        model: User,
        mapToModel: true,
        type: QueryTypes.SELECT
      })

      console.log('testing', users)

      res.send(users)
    } catch (err) {
      res.status(404).send({
        error: 'Users Not Found.'
      })
    }
  },

  async getUser (req, res) {
    try {
      const user = await User.findByPk(req.params.userId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })

      res.send(user.toJSON())
    } catch (err) {
      res.status(404).send({
        error: 'User Not Found.'
      })
    }
  },

  async addUser (req, res) {
    try {
      let today = new Date().toISOString().slice(0, 10)
      const user = await User.create(req.body)

      res.status(201).send({
        message: req.body.firstName + ' ' + req.body.lastName + ' was added successfully.',
        user: user
      })
    } catch (err) {
      res.status(400).send({
        error: 'This user could not be added.'
      })
    }
  },

  async updateUser (req, res) {
    try {
      await User.findByPk(req.params.userId)
        .then(
          user => {
            if (!user) {
              return res.status(404).json({
                error: 'User Not Found'
              })
            }

            return user.update(req.body)
              .then(() => res.status(200).send({
                message: 'User was updated successfully.',
                body: req.body,
                user: user
              }))
              .catch((error) => res.status(400).send(error))
          }
        )
    } catch (err) {
      res.status(400).send({
        error: 'The User could not be updated.'
      })
    }
  },

  async deleteUser (req, res) {
    try {
      return User.destroy({
        where: {
          id: req.params.userId
        }
      })
        .then(() => {
          res.status(200).send({
            message: 'The User was deleted successfully.'
          })
        })
        .catch((error) => res.status(400).send(error))
    } catch (err) {
      res.status(400).send({
        error: 'The User could not be deleted.'
      })
    }
  }
}
