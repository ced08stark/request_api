import pkg from '@prisma/client'

const { PrismaClient } = pkg
const prisma = new PrismaClient()

const { interventionLogiciel: InterventionLogiciel } = prisma
const { interventionMateriel: InterventionMateriel } = prisma
const { equipementLogiciel: EquipementLogiciel } = prisma
const { equipementMateriel: EquipementMateriel } = prisma
const { materiel: Materiel } = prisma
const { logiciel: Logiciel } = prisma
const { user: User } = prisma

export default {
  //CRUD des equiments materiels
  async getAllInterventionMaterielsData(req, res) {
      try {
        const result = []
        const dataI = await InterventionMateriel.findMany();
        console.log(dataI)
           if (dataI.length > 0) {
            for (const item of dataI) {
                const id = item.id
                const idEquipement = item.equipementMaterielId
                const idUser = item.userId
                const typeDiagnostique = item.typeDiagnostique
                const desctiption = item.description
                const isBegin = item.isBegin
                const createTicketDate = item.createdAt
                const equipement = await EquipementMateriel.findUnique({ where: { id: parseInt(idEquipement) } })
                const user = await User.findUnique({ where: { id: idUser } })
                if (equipement && user) {
                  const materiel = await Materiel.findUnique({ where: { id: equipement.materielId } })
                  if (materiel) {
                    result.push({
                      id,
                      typeDiagnostique,
                      desctiption,
                      isBegin,
                      createTicketDate,
                      equipement,
                      materiel,
                      user,
                    })
                  }
                //   res.status(200).json(result)
                // } else {
                //   res.status(404).json({ message: 'not found data' })
                }
            }
             res.status(200).json(result) 
           } else {
             res.status(404).json({ message: 'not found data' })
           }
         }
      catch (error) {
        res.status(500).json({
          message: 'Somthing went Wrong',
          error: error,
        })
      }

  },
      
  //   InterventionMateriel.findMany()
  //     .then((data) => {
  //       if (data.length > 0) {
  //         res.status(200).json(data)
  //       } else {
  //         res.status(404).json({ message: 'not found data' })
  //       }
  //     })
      
  // },

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
      isBegin: req.body.isBegin,
      userId: req.body.userId,
      equipementMaterielId: req.body.equipementId,
    }
    console.log(intervention)
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
      isBegin: req.body.isBegin,
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

  getAllInterventionLogicielsData(req, res) {
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
      isBegin: req.body.isBegin,
      userId: req.body.userId,
      equipementLogicielId: req.body.equipementId,
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
      isBegin: req.body.isBegin,
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
