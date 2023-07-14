import pkg from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

const { media: Media } = prisma
const { request: Request } = prisma


export default {
  async getAllRequest(req, res) {
    try {
      let results = []
      const data = await Request.findMany()
      if (data.length > 0) {
        for (const item of data) {
          const id = item.id

          const medias = await Media.findMany({ where: { id: parseInt(id) } })
          if (medias.length > 0) {
            results.push({ item, medias })
          } else {
            results.push(item)
          }
        }
        res.status(200).json(results)
      } else {
        res.status(404).json({ message: 'not found requests' })
      }
    } catch (error) {
      res.status(500).json({
        message: 'Somthing went Wrong',
        error: error,
      })
    }
  },
  async getRequestById(req, res) {
    const id = req.params.id

    try {
      let results = []
      const data = await Request.findUnique({ where: { id: parseInt(id) } })
      if (data) {
        const id = item.id
        const medias = await Media.findMany({ where: { id: parseInt(id) } })
        if (medias.length > 0) {
          results.push({ data, medias })
        } else {
          results.push(data)
        }

        res.status(200).json(results)
      } else {
        res.status(404).json({ message: 'not found requests' })
      }
    } catch (error) {
      res.status(500).json({
        message: 'Somthing went Wrong',
        error: error,
      })
    }
  },
  async addRequest(req, res) {
    console.log(req.body)
    let result = {}
    let mediasList = []
    const files = req.files
    for (const file of files) {
      console.log(file)
    }
    //  const files = [
    //    'files-1689112954108-292015028.jpg',
    //    'files-1689113748794-929513292.pdf',
    //    'files-1689318983382-279759509.docx',
    //  ]
    const request = {
      object: req.body.object,
      content: req.body.content,
      senderId: parseInt(req.body.senderId),
      receiverId: parseInt(req.body.receiverId),
      status: 'en cour',
      isFavorite: false,
      isView: false,
    }
    try {
      const data = await Request.create({ data: request })
      console.log(data)
      if (data) {
        if (files.length > 0) {
          for (const item of files) {
            const media = {
              url: item.filename,
              //url: item,
              requestId: data.id,
            }
            const medias = await Media.create({ data: media })
            mediasList.push(medias)
          }
          res.status(200).json({ data, mediasList })
        } else {
          res.status(404).json({ message: 'not found request' })
        }
      }
    } catch (error) {
      res.status(500).json({
        message: 'Somthing went Wrong',
        error: error,
      })
    }
  },
  updateRequest(req, res) {
    const id = req.params.id
    const request = {
      object: req.body.object,
      content: req.body.content,
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      status: req.body.status,
      isFavorite: req.body.isFavorite,
      isView: req.body.isView,
    }
    Request.update({ where: { id: parseInt(id) }, data: request })
      .then((data) => {
        if (data) {
          res.status(201).json({
            message: 'request update success',
            data,
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
  deleteRequest(req, res) {
    let medias = []
    const id = req.params.id
    Request.delete({ where: { id: parseInt(id) } })
      .then((data) => {
        if (data) {
          Media.deleteMany({ where: { requestId: parseInt(id) } }).then((data) => {
            if (data) {
              medias.push(data)
            }
          })
          medias.push(data)
          res.status(201).json({
            message: 'request delete success',
            result: medias,
          })
        } else {
          res.status(404).json({ message: 'not found request' })
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      })
  },
}
