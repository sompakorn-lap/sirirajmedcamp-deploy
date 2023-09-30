const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema({
  userId: String,
  pass: Boolean,
  editable: Boolean,
  // personal information
  surname: String,
  nickname: String,
  citizenId: String,
  birthday: Date,
  race: String,
  citizenship: String,
  religion: String,
  school: String,
  province: String,
  congenitalDisease: String,
  allergicFood: String,
  allergicDrug: String,
  // contact
  address: String,
  telephone: String,
  email: String,
  facebook: String,
  line: String,
  // parent information
  parentSurname: String,
  relation: String,
  parentTelephone: String,
  // university
  university1: String,
  university2: String,
  university3: String,
  university4: String,
})

const Profile = mongoose.model('profile', ProfileSchema)

module.exports = Profile