const router = require('express').Router()
const IqExamController = require('../controllers/IqExamController')

router.route('/:userId')
  .get(IqExamController.getQuestions)

router.route('/view/:questionId')
  .get(IqExamController.viewQuestion)

router.route('/save/:userId')
  .patch(IqExamController.saveAnswers)

router.route('/submit/:userId')
  .patch(IqExamController.submitAnswers)

module.exports = router