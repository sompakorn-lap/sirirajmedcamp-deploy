const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.route('/dashboard/:userId')
  .get(UserController.getDashboard)

module.exports = router