const mongoose = require('mongoose')

const QuestionnaireSchema = mongoose.Schema({
  userId: String,
  answers: {
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    answer5: String,
    answer6: String,
  }
})

const Questionnaire = mongoose.model('questionnaire', QuestionnaireSchema)

module.exports = Questionnaire