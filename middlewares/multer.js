import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadPath = path.resolve(__dirname, '../uploads')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    const fileType = getFileType(file)
    const destinationPath = path.join(uploadPath, fileType)
    
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath)
    }
    
    cb(null, destinationPath)
  },
  filename: (req, file, cb) => {
    //cb(null, file.originalname)
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + getFileExtension(file))
  },
})

const uploadFiles = multer({ storage: storage }).array('files')

const storageForImage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = getFileType(file)

    if (fileType === 'images') {
      const destinationPath = path.join(uploadPath, fileType)

      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath)
      }
      cb(null, destinationPath)
    } else {
      cb(new Error('Invalid file type'))
    }
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + getFileExtension(file))
  },
})

const uploadImage = multer({ storage: storageForImage })


function getFileExtension(file) {
  return file.originalname.split('.').pop()
}
function getFileType(file) {
  const extension = getFileExtension(file)
  if (['pdf'].includes(extension)) {
    return 'pdf'
  } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
    return 'images'
  } else if (['mp4', 'avi', 'mkv'].includes(extension)) {
    return 'videos'
  } else {
    return 'autres'
  }
}

export {uploadFiles, uploadImage}
