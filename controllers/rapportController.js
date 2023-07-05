import pkg from '@prisma/client'

const { PrismaClient } = pkg
const prisma = new PrismaClient()

const { rapportLogiciel: RapportLogiciel } = prisma
const { rapportMateriel: RapportMateriel } = prisma



export default {
  //CRUD des equiments materiels
  getAllRapportMateriels(req, res) {
    RapportMateriel.findMany()
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

  getRapportMaterielById(req, res) {
    const id = req.params.id
    RapportMateriel.findUnique({ where: { id: parseInt(id) } })
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

  addRapportMateriel(req, res) {
    const rapport = {
      title: req.body.title,
      description: req.body.description,
      interventionId: req.body.interventionId,
    }
    RapportMateriel.create({ data: rapport })
      .then((result) => {
        res.status(200).json({
          message: 'Rapport Materiel create success',
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
  deleteRapportMateriel(req, res) {
    const id = req.params.id
    RapportMateriel.delete({ where: { id: parseInt(id) } })
      .then((result) => {
        res.status(201).json({
          message: 'Rapport Materiel delete success',
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
  updateRapportMateriel(req, res) {
    const id = req.params.id
    const rapport = {
      title: req.body.title,
      description: req.body.description,
      interventionId: req.body.interventionId,
    }
    RapportMateriel.update({ data: rapport }, { where: { id: parseInt(id) } })
      .then((result) => {
        res.status(201).json({
          message: 'Rapport Materiel update success',
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
  getAllRapportLogiciels(req, res) {
    RapportLogiciel.findMany()
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

  getRapportLogicielById(req, res) {
    const id = req.params.id
    RapportLogiciel.findUnique({ where: { id: parseInt(id) } })
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

  addRapportLogiciel(req, res) {
    const rapport = {
      title: req.body.title,
      description: req.body.description,
      interventionId: req.body.interventionId,
    }
    RapportLogiciel.create({ data: rapport })
      .then((result) => {
        res.status(200).json({
          message: 'Rapport Logiciel create success',
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
  deleteRapportLogiciel(req, res) {
    const id = req.params.id
    RapportLogiciel.delete({ where: { id: parseInt(id) } })
      .then((result) => {
        res.status(201).json({
          message: 'Rapport Logiciel delete success',
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
  updateRapportLogiciel(req, res) {
    const id = req.params.id
    const rapport = {
      title: req.body.title,
      description: req.body.description,
      interventionId: req.body.interventionId,
    }
    RapportLogiciel.update({ data: rapport }, { where: { id: parseInt(id) } })
      .then((result) => {
        res.status(201).json({
          message: 'Rapport logiciel update success',
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
