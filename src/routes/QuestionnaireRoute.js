const router = require('express').Router()
const QuestionnaireController = require('../controllers/QuestionnaireController')

router.route('/:userId')
  .post(QuestionnaireController.createQuestionnaire)

module.exports = router