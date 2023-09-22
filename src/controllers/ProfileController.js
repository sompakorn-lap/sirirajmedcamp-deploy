const asyncHandler = require('express-async-handler')
const Profile = require('../models/Profile')

const findProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const profile = await Profile.findOne({ userId }).lean().exec()
  if(!profile){
    const newProfile = await Profile.create({
      userId,
      editable: true
    })
    if(newProfile){
      return res.status(200).json(newProfile)
    }
    else {
      return res.status(400).send('Failed to create profile')
    }
  }
  res.status(200).json(profile)
})

const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const profile = await Profile.findOneAndUpdate({ userId, editable: true }, req.body).lean().exec()
  if(!profile){
    return res.status(404).send('Profile not found')
  }
  res.status(200).send('Successful profile update')
})

module.exports = {
  findProfile,
  updateProfile
}