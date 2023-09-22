const mongoose = require('mongoose')

const documentSchema = mongoose.Schema({
  userId: String,
  permissionId: String,
  transcriptionId: String,
})

const Document = mongoose.model('document', documentSchema)

module.exports = Document