const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Document = require('../models/Document')
const Profile = require('../models/Profile')
const { IqExamAnswer, EthicExamAnswer, SirirajExamAnswer } = require('../services/exam/models/ChoiceAnswer')
const { MedicalExamAnswer, CreativeExamAnswer } = require('../services/exam/models/WritingAnswer')

const getDashboard = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const user = await User.findOne({ userId }).lean().exec()
  if(!user){
    return res.status(404).send('User not found')
  }

  const document = await Document.findOne({ userId }).lean().exec()
  const profile = await Profile.findOne({ userId }).lean().exec()
  const iq = await IqExamAnswer.findOne({ userId }).lean().exec()
  const ethic = await EthicExamAnswer.findOne({ userId }).lean().exec()
  const siriraj = await SirirajExamAnswer.findOne({ userId }).lean().exec()
  const medical = await MedicalExamAnswer.findOne({ userId }).lean().exec()
  const creative = await CreativeExamAnswer.findOne({ userId }).lean().exec()

  const getStatus = (obj) => {
    if(!obj){
      return 'ยังไม่ได้ทำ'
    }
    else {
      if(obj.editable){
        return 'กำลังทำ'
      }
      else {
        return 'ทำเสร็จแล้ว'
      }
    }
  }

  const data = {
    username: user.username,
    documentStatus: (document ? 'ทำเสร็จแล้ว' : 'ยังไม่ได้ทำ'),
    profileStatus: getStatus(profile),
    iqStatus: getStatus(iq),
    ethicStatus: getStatus(ethic),
    sirirajStatus: getStatus(siriraj),
    medicalStatus: getStatus(medical),
    creativeStatus: getStatus(creative),
  }
  // console.log(data)

  res.status(200).json(data)
})

module.exports = {
  getDashboard
}