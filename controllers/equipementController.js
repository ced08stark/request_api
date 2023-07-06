import pkg from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

const { equipementMateriel: EquipementMateriel } = prisma
const { equipementLogiciel: EquipementLogiciel } = prisma
const { user: User } = prisma
const { materiel: Materiel } = prisma
const { logiciel: Logiciel } = prisma

export default {
  //CRUD des equiments materiels
  getAllEquipementsMateriels(req, res) {
    EquipementMateriel.findMany()
      .then((data) => {
        if (data.length > 0) {
          res.status(200).json(data)
        } else {
          res.status(404).json({ message: 'not found data' })
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      })
  },
  getAllEquipementMateriels(req, res) {
    const userId = req.body.userId
    EquipementMateriel.findMany({ where: { userId: parseInt(userId) } })
      .then((data) => {
        if (data.length > 0) {
          res.status(200).json(data)
        } else {
          res.status(404).json({ message: 'not found data' })
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      })
  },

  getEquipementMaterielById(req, res) {
    const id = req.params.id
    EquipementMateriel.findUnique({ where: { id: parseInt(id) } })
      .then((data) => {
        console.log(data)
        if (data) {
          res.status(200).json(data)
        } else {
          res.status(404).json({ message: 'not found data' })
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      })
  },

  addEquipementMateriel(req, res) {
    EquipementLogiciel.findUnique({ where: { materielId: req.body.materielId } && { userId: req.body.userId } })
      .then((result) => {
        if (result) {
          res.status(409).json({
            message: 'this materiel equipment already Existe',
          })
        } else {
          const equipement = {
            materielId: req.body.materielId,
            userId: req.body.userId,
          }
          EquipementMateriel.create({ data: equipement })
            .then((result) => {
              res.status(200).json({
                message: 'Equipement Materiel create success',
                result,
              })
            })
            .catch((error) => {
              res.status(500).json({
                message: 'Somthing went Wrong',
                error: error,
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

  deleteEquipementMateriel(req, res) {
    const id = req.params.id
    EquipementMateriel.delete({ where: { id: parseInt(id) } })
      .then((result) => {
        res.status(201).json({
          message: 'Equipement Materiel delete success',
          result,
        })
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      })
  },
  updateEquipementMateriel(req, res) {
    const id = req.params.id
    const equipement = {
      id: req.body.id,
      materialId: req.body.materialId,
      userId: req.body.userId,
      status: req.body.status,
      createdAt: req.body.createdAt,
      updateAt: req.body.updateAt,
    }
    EquipementMateriel.updateMany({ data: equipement }, { where: { id: parseInt(id) } })
      .then((result) => {
        res.status(201).json({
          message: 'Equipement Materiel update success',
          result,
        })
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      })
  },

  //CRUD des equiments logiciels
  getAllEquipementsLogiciels(req, res) {
    EquipementLogiciel.findMany()
      .then((data) => {
        if (data.length > 0) {
          res.status(200).json(data)
        } else {
          res.status(404).json({ message: 'not found data' })
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      })
  },
  getAllEquipementLogiciels(req, res) {
    const userId = req.body.userId
    EquipementLogiciel.findMany({ where: { userId: parseInt(userId) } })
      .then((data) => {
        if (data.length > 0) {
          res.status(200).json(data)
        } else {
          res.status(404).json({ message: 'not found data' })
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      })
  },
  async getAllEquipementMateriels2(req, res) {
    try {
      const result = []
      const data = await EquipementMateriel.findMany({ where: { status: false } })
      if (data.length > 0) {
        for (const item of data) {
          const user = await User.findUnique({ where: { id: item.userId } })
          if (user) {
            const materiels = await Materiel.findUnique({ where: { id: item.materielId } })
            if (materiels) {
              result.push({ user, materiels })
            }
          }
        }
        res.status(200).json(result)
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
  ///
  async getAllEquipementLogiciels1(req, res) {
    try {
      const result = []
      const data = await EquipementLogiciel.findMany({ where: { status: false } })
      if (data.length > 0) {
        for (const item of data) {
          const user = await User.findUnique({ where: { id: item.userId } })
          if (user) {
            const logiciels = await Logiciel.findUnique({ where: { id: item.logicielId } })
            if (logiciels) {
              result.push({ user, logiciels })
            }
          }
        }
        res.status(200).json(result)
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

  getEquipementLogicielById(req, res) {
    const id = req.params.id
    EquipementLogiciel.findUnique({ where: { id: parseInt(id) } })
      .then((data) => {
        if (data) {
          res.status(200).json(data)
        } else {
          res.status(404).json({ message: 'not found data' })
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      })
  },

  addEquipementLogiciel(req, res) {
    EquipementLogiciel.findMany({ where: { AND: [{ logicielId: req.body.logicielId, userId: req.body.userId }] } })
      .then((result) => {
        if (result.length > 0) {
          console.log(result)
          res.status(409).json({
            message: 'this equipment logiciel already Exist',
          })
        } else {
          const equipement = {
            logicielId: req.body.logicielId,
            userId: req.body.userId,
            status: false,
          }
          console.log(equipement)
          EquipementLogiciel.create({ data: equipement })
            .then((result) => {
              res.status(200).json({
                message: 'Equipement Logiciel create success',
                result,
              })
            })
            .catch((error) => {
              res.status(500).json({
                message: 'Somthing went Wrong',
                error: error,
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

  deleteEquipementLogiciel(req, res) {
    const id = req.params.id
    EquipementLogiciel.delete({ where: { id: parseInt(id) } })
      .then((result) => {
        res.status(201).json({
          message: 'Equipement Logiciel delete success',
          result,
        })
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      })
  },
  updateEquipementLogiciel(req, res) {
    const id = req.params.id
    var date = new Date().toDateString()
    console.log(date)
    const equipement = {
      id: req.body.id,
      logicielId: req.body.logicielId,
      userId: req.body.userId,
      status: req.body.status,
      createdAt: req.body.createdAt,
      updateAt: req.body.updateAt,
    }
    EquipementLogiciel.updateMany({ data: equipement }, { where: { id: parseInt(id) } })
      .then((result) => {
        res.status(201).json({
          message: 'Equipement logiciel update success',
          result,
        })
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      })
  },
}
