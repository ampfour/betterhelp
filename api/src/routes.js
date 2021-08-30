const UserController = require('./controllers/UserController')

module.exports = (app) => {
  app.get('/users', UserController.getUsers)
  app.get('/user/:userId', UserController.getUser)
  app.post('/users', UserController.addUser)
  app.put('/users/:userId', UserController.updateUser)
  app.delete('/users/:userId', UserController.deleteUser)
}