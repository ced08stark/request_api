import express from 'express'
import cors from 'cors'
import multer from 'multer'
import userRoute from './routes/userRoute.js'
import requestRoute from './routes/requestRoute.js'
import mediaRoute from './routes/mediaRoute.js'
import adminRoute from './routes/adminRoute.js'
// import { uploadFiles } from './middlewares/multer.js'
// import { uploadImage } from './middlewares/multer.js'
const router = express.Router()

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cors())
server.use((req, res, next) => {
  res.setHeader('Access-Controll-Allow-Origin', '*')
  res.setHeader('Access-Controll-Allow-Headers', 'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization')
  res.setHeader('Access-Controll-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})
server.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is working !',
  })
})

server.use("/api", userRoute)
server.use("/api", adminRoute)
server.use('/api', requestRoute)
server.use('/api', mediaRoute)
server.use('/uploads/pdf', express.static('uploads/pdf'))
server.use('/uploads/images', express.static('uploads/images'))
server.use('/upload/autre', express.static('uploads/autres'))

// router.post('/uploadImage', uploadImage.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "Aucune image n'a été téléchargé" })
//   }

//   // Vous pouvez ajouter d'autres traitements ici, par exemple sauvegarder le chemin du fichier dans une base de données

//   res.status(200).json({ message: 'Fichier image avec succès' })
// })

//router.post('/uploadImage', uploadImage)

// router.post('/upload', (req, res) => {
//   uploads(req, res, (err) => {
//     console.log(req.files.length)
//     if (err instanceof multer.MulterError) {
//       // Une erreur Multer s'est produite lors du téléchargement des fichiers
//       return res.status(400).json({ message: 'Erreur lors du téléchargement des fichiers', error: err })
//     } else if (err) {
//       // Une autre erreur s'est produite
//       return res.status(500).json({ message: "Une erreur s'est produite lors du traitement des fichiers", error: err })
//     }

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "Aucun fichier n'a été téléchargé" })
//     }

//     // Traitez chaque fichier individuellement si nécessaire

//     res.status(200).json({ message: 'Fichiers téléchargés avec succès' })
//   })
// })

server.listen(3001)

export default server;

