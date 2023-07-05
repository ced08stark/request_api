import rapportController from '../controllers/rapportController.js'
import express from 'express'

const router = express.Router()

router.get('/rapports/materiels', rapportController.getAllRapportMateriels)
router.get('/rapports/logiciels', rapportController.getAllRapportLogiciels)
router.get('/rapports/materiels/:id', rapportController.getRapportMaterielById)
router.get('/rapports/logiciels/:id', rapportController.getRapportLogicielById)
router.post('/rapports/logiciel', rapportController.addRapportLogiciel)
router.post('/rapports/materiel', rapportController.addRapportMateriel)
router.patch('/rapports/logiciel/:id', rapportController.updateRapportLogiciel)
router.patch('/rapports/materiel/:id', rapportController.updateRapportMateriel)
router.delete('/rapports/logiciel/:id', rapportController.deleteRapportLogiciel)
router.delete('/rapports/materiel/:id', rapportController.deleteRapportMateriel)

export default router
