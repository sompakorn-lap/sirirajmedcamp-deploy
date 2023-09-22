const router = require('express').Router()
const CreativeExamController = require('../controllers/CreativeExamController')

router.route('/:userId')
  .get(CreativeExamController.getQuestions)

router.route('/view/:questionId')
  .get(CreativeExamController.viewQuestion)

router.route('/save/:userId')
  .patch(CreativeExamController.saveAnswers)

router.route('/submit/:userId')
  .patch(CreativeExamController.submitAnswers)

module.exports = router