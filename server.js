import express from 'express'
import cors from 'cors'
import multer from 'multer'
import userRoute from './routes/userRoute.js'
import adminRoute from './routes/adminRoute.js'
import equipementRoute from './routes/equipementRoute.js'
import logicielRoute from './routes/logicielRoute.js'
import rapportRoute from './routes/rapportRoute.js'
import materialRoute from './routes/materielRoute.js'
import interventionRoute from './routes/interventionRoute.js'

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

server.use("/", userRoute)
server.use("/", adminRoute)
server.use('/', logicielRoute)
server.use('/', materialRoute)
server.use('/', rapportRoute)
server.use('/', equipementRoute)
server.use('/', interventionRoute)

server.use('/upload', express.static('images'))




server.listen(3001)

export default server;

