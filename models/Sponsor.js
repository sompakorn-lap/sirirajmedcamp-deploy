const mongoose = require('mongoose')

const SponsorSchema = mongoose.Schema({
  link: String,
  image: String
})

const Sponsor = mongoose.model('sponsor', SponsorSchema)

module.exports = Sponsor