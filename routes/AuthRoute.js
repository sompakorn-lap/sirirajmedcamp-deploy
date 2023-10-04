const router = require('express').Router()
const AuthController = require('../controllers/AuthController')

router.route('/register')
  .post(AuthController.register)

router.route('/login')
  .post(AuthController.login)

router.route('/logout')
  .delete(AuthController.logout)

router.route('/refresh')
  .get(AuthController.refresh)

module.exports = router