import pkg from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

const { user: User } = prisma
const { media: Media } = prisma
const { request: Request } = prisma

export default {
signUpUser(req, res){
    User.findUnique({ where: { email: req.body.email } })
      .then((result) => {
        if (result) {
          res.status(409).json({
            message: 'Email already Existe',
          })
        } else {
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt
              .hash(req.body.password, salt, function (error, hash) {
                const user = {
                  email: req.body.email,
                  password: hash,
                  username: req.body.username,
                  phone: req.body.phone,
                  image: req?.file?.filename,
                  role: req.body.role,
                }
                
                User.create({ data: user })
                  .then((result) => {
                    res.status(200).json({
                      message: 'User created succes',
                      result,
                    })
                  })
                  .catch((error) => {
                    res.status(500).json({
                      message: 'Somthing went Wrong',
                      error: error,
                    })
                  })
              })
          })
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      })
  },

async getAllUser(req, res){
  try {
      let results = []

      const data = await User.findMany()
      if (data.length > 0) {
        for (const item of data) {
          const id = item.id
          const requestsSends = await Request.findMany({ where: { senderId: parseInt(id) } })
          const requestsReceives = await Request.findMany({ where: { receiverId: parseInt(id) } })
          let requestsSend = []
          let requestsReceive = []
          if (requestsSends.length>0) {
              for (const item of requestsSends) {
                const id = item.id
                const idSender = item.senderId
                const idReceiver = item.receiverId
                const sender = await User.findUnique({ where: { id: parseInt(idSender) } })
                const receiver = await User.findUnique({ where: { id: parseInt(idReceiver) } })
                const medias = await Media.findMany({ where: { requestId: parseInt(id) } })
                requestsSend.push({ request: item, sender, receiver, medias })
              }
          }
          if (requestsReceives.length > 0) {
            for (const item of requestsReceives) {
              const id = item.id
              const idSender = item.senderId
              const idReceiver = item.receiverId
              const sender = await User.findUnique({ where: { id: parseInt(idSender) } })
              const receiver = await User.findUnique({ where: { id: parseInt(idReceiver) } })
              const medias = await Media.findMany({ where: { requestId: parseInt(id) } })
              requestsReceive.push({ request: item, sender, receiver, medias })
            }
          }
          results.push({user: item, requestsSend, requestsReceive})
        }
        res.status(200).json({count: results.length , users: results})
      } else {
        res.status(404).json({ message: 'not found data' })
      }
    } catch (error) {
      res.status(500).json({
        message: 'Somthing went Wrong',
        error: error,
      })
    }
},

async getUserById(req, res) {
  try {
    let results = []
    const id = req.params.id
    const data = await User.findUnique({where: {id: parseInt(id)}})
    if (data) {
      console.log(data)
        const id = data.id
        const requestsSends = await Request.findMany({ where: { senderId: parseInt(id) } })
        const requestsReceives = await Request.findMany({ where: { receiverId: parseInt(id) } })
        let requestsSend = []
        let requestsReceive = []
        if (requestsSends.length > 0) {
          for (const item of requestsSends) {
            const id = item.id
            const idSender = item.senderId
            const idReceiver = item.receiverId
            const sender = await User.findUnique({ where: { id: parseInt(idSender) } })
            const receiver = await User.findUnique({ where: { id: parseInt(idReceiver) } })
            const medias = await Media.findMany({ where: { requestId: parseInt(id) } })
            requestsSend.push({ request: item, medias, sender, receiver })
          }
        }
        if (requestsReceives.length > 0) {
          for (const item of requestsReceives) {
            const id = item.id
            const idSender = item.senderId
            const idReceiver = item.receiverId
            const sender = await User.findUnique({ where: { id: parseInt(idSender) } })
            const receiver = await User.findUnique({ where: { id: parseInt(idReceiver) } })
            const medias = await Media.findMany({ where: { requestId: parseInt(id) } })
            requestsReceive.push({ request: item, medias, sender, receiver })
          }
        }
        results.push({ user: data, requestsSend, requestsReceive })
      
        res.status(200).json(results)
    } else {
      res.status(404).json({ message: 'not found data' })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Somthing went Wrong',
      error: error,
    })
  }
},
login(req, res){
    User.findUnique({ where: { email: req.body.email } })
      .then((user) => {
        if (user == null) {
          console.log(res)
          res.status(401).json({
            message: "User Doesn't exist",
          })
        } else {
          bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                'secret',
                function (error, token) {
                  res.status(200).json({
                    message: 'Authentication successful',
                    user: user,
                    token: token,
                  })
                }
              )
            } else {
              res.status(401).json({
                message: 'Invalid credential',
              })
            }
          })
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      })
}
}