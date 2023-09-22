const router = require('express').Router()
const EthicExamController = require('../controllers/EthicExamController')

router.route('/:userId')
  .get(EthicExamController.getQuestions)

router.route('/view/:questionId')
  .get(EthicExamController.viewQuestion)

router.route('/save/:userId')
  .patch(EthicExamController.saveAnswers)

router.route('/submit/:userId')
  .patch(EthicExamController.submitAnswers)

module.exports = router