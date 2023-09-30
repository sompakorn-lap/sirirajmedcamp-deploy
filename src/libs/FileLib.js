const crypto = require('crypto')
const stream = require('stream')
const { drive } = require('../configs/googleConfig')

function uploadFile(base64url) {
  return new Promise(async function(resolve, reject) {
    try {
      const buffer = Buffer.from(base64url.split(',')[1], 'base64')
      const bufferStream = new stream.PassThrough()
      bufferStream.end(buffer)
  
      const fileName = crypto.randomUUID()
  
      const { data } = await drive.files.create({
        requestBody: {
          name: fileName,
          parents: ['12MvdvdxiKUfbWZbIBPRNR5-Zg7yY_sBz']
        },
        media: {
          body: bufferStream
        }
      })
      resolve({ fileName, fileId: data.id })
    }
    catch(err) {
      reject(err)
    }
  })
}

module.exports = { uploadFile }