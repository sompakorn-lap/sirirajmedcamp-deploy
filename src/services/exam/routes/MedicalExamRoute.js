const router = require('express').Router()
const MedicalExamController = require('../controllers/MedicalExamController')

router.route('/:userId')
  .get(MedicalExamController.getQuestions)

router.route('/view/:questionId')
  .get(MedicalExamController.viewQuestion)

router.route('/save/:userId')
  .patch(MedicalExamController.saveAnswers)

router.route('/submit/:userId')
  .patch(MedicalExamController.submitAnswers)

module.exports = router