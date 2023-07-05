import pkg from '@prisma/client'

const { PrismaClient } = pkg
const prisma = new PrismaClient()

const { interventionLogiciel: InterventionLogiciel } = prisma
const { interventionMateriel: InterventionMateriel } = prisma


export default {
  //CRUD des equiments materiels
  getAllInterventionMateriels(req, res) {
    InterventionMateriel.findMany()
      .then((data) => {
        if (data.length>0) {
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

  getInterventionMaterielById(req, res) {
    const id = req.params.id
    console.log(id)
    InterventionMateriel.findUnique({ where: { id: parseInt(id) } })
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

  addInterventionMateriel(req, res) {
    const intervention = {
    description: req.body.description,
    typeDiagnostique: req.body.typeDiagnostique,
    isAssign: req.body.isAssign,
    isFrequency: req.body.isFrequency,
    userId: req.body.userId,
    equipementId: req.body.equipementId,
    }
    InterventionMateriel.create({ data: intervention })
      .then((result) => {
        res.status(200).json({
          message: 'Intervention Materiel create success',
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
  deleteInterventionMateriel(req, res) {
    const id = req.params.id
    InterventionMateriel.delete({ where: { id: parseInt(id) } })
      .then((result) => {
        res.status(201).json({
          message: 'Intervention Materiel delete success',
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
  updateInterventionMateriel(req, res) {
    const id = req.params.id
    const intervention = {
      description: req.body.description,
      typeDiagnostique: req.body.typeDiagnostique,
      isAssign: req.body.isAssign,
      isFrequency: req.body.isFrequency,
      userId: req.body.userId,
      equipementId: req.body.equipementId,
      createdAt: req.body.createdAt,
      updateAt: req.body.updateAt,
    }
    InterventionMateriel.updateMany({ data: intervention }, { where: { id: parseInt(id) } })
      .then((result) => {
        res.status(201).json({
          message: 'Intervention Materiel update success',
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
  getAllInterventionLogiciels(req, res) {
    InterventionLogiciel.findMany()
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

  getInterventionLogicielById(req, res) {
    const id = req.params.id
    console.log(id)
    InterventionLogiciel.findUnique({ where: { id: parseInt(id) } })
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

  addInterventionLogiciel(req, res) {
    const intervention = {
        description: req.body.description,
        typeDiagnostique: req.body.typeDiagnostique,
        isAssign: req.body.isAssign,
        isFrequency: req.body.isFrequency,
        userId: req.body.userId,
        equipementId: req.body.equipementId,
    }
    InterventionLogiciel.create({ data: intervention })
      .then((result) => {
        res.status(200).json({
          message: 'Intervention Logiciel create success',
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
  deleteInterventionLogiciel(req, res) {
    const id = req.params.id
    InterventionLogiciel.delete({ where: { id: parseInt(id) } })
      .then((result) => {
        res.status(201).json({
          message: 'Intervention Logiciel delete success',
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
  updateInterventionLogiciel(req, res) {
    const id = req.params.id
    const intervention = {
      description: req.body.description,
      typeDiagnostique: req.body.typeDiagnostique,
      isAssign: req.body.isAssign,
      isFrequency: req.body.isFrequency,
      userId: req.body.userId,
      equipementId: req.body.equipementId,
      createdAt: req.body.createdAt,
      updateAt: req.body.updateAt,
    }
    InterventionLogiciel.updateMany({ data: intervention }, { where: { id: parseInt(id) } })
      .then((result) => {
        res.status(201).json({
          message: 'Intervention logiciel update success',
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
