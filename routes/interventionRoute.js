import interventionController from '../controllers/interventionController.js'
import express from 'express'

const router = express.Router()

router.get('/interventions/materiels', interventionController.getAllInterventionMaterielsData)
router.get('/interventions/logiciels', interventionController.getAllInterventionLogiciels)
router.get('/interventions/materiels/:id', interventionController.getInterventionMaterielById)
router.get('/interventions/logiciels/:id', interventionController.getInterventionLogicielById)
router.post('/interventions/logiciel', interventionController.addInterventionLogiciel)
router.post('/interventions/materiel', interventionController.addInterventionMateriel)
router.patch('/interventions/logiciels/:id', interventionController.updateInterventionLogiciel)
router.patch('/interventions/materiels/:id', interventionController.updateInterventionMateriel)
router.delete('/interventions/logiciels/:id', interventionController.deleteInterventionLogiciel)
router.delete('/interventions/materiels/:id', interventionController.deleteInterventionMateriel)

export default router
