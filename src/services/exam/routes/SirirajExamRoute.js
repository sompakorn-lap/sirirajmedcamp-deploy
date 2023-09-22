const router = require('express').Router()
const SirirajExamController = require('../controllers/SirirajExamController')

router.route('/:userId')
  .get(SirirajExamController.getQuestions)

router.route('/view/:questionId')
  .get(SirirajExamController.viewQuestion)

router.route('/save/:userId')
  .patch(SirirajExamController.saveAnswers)

router.route('/submit/:userId')
  .patch(SirirajExamController.submitAnswers)

module.exports = router