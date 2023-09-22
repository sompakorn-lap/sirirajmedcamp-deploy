function shuffleQuestion(questions){
  return questions
    .sort(0.5 - Math.random())
    .map((item) => ({ ...item, text: '', score: 0 }))
}

async function ChoiceExamGrader(answers, questionModel){
  return Promise.all(answers.map(async function({ questionId, text }) {
    const question = await questionModel.findOne({ questionId })
    const score = question.choices.reduce((sum, choice) => sum + (choice.text === text ? choice.score : 0), 0)
    return {
      questionId,
      text,
      score
    }
  }))
}

module.exports = {
  shuffleQuestion,
  ChoiceExamGrader
}