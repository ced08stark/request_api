import equipementController from '../controllers/equipementController.js'
import express from 'express'

const router = express.Router()

router.get('/equipements/materiels', equipementController.getAllEquipementMateriels)
router.get('/equipements/logiciels', equipementController.getAllEquipementLogiciels)
router.get('/equipements/materiels/:id', equipementController.getEquipementMaterielById)
router.get('/equipements/logiciels/:id', equipementController.getEquipementLogicielById)
router.post('/equipements/logiciel', equipementController.addEquipementLogiciel)
router.post('/equipements/materiel', equipementController.addEquipementMateriel)
router.patch('/equipements/logiciels/:id', equipementController.updateEquipementLogiciel)
router.patch('/equipements/materiels/:id', equipementController.updateEquipementMateriel)
router.delete('/equipements/logiciels/:id', equipementController.deleteEquipementLogiciel)
router.delete('/equipements/materiels/:id', equipementController.deleteEquipementMateriel)

export default router
