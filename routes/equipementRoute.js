import equipementController from '../controllers/equipementController.js'
import express from 'express'

const router = express.Router()
router.get('/equipements/materiels', equipementController.getAllEquipementsMateriels)
router.get('/equipements/logiciels', equipementController.getAllEquipementsLogiciels)
router.get('/equipements/logiciels/user', equipementController.getAllEquipementLogiciels)
router.get('/equipements/materiels/user', equipementController.getAllEquipementMateriels)
router.get('/equipements/logiciels/user', equipementController.getAllEquipementLogiciels)
router.get('/equipements/logiciels/user-datas', equipementController.getAllEquipementLogiciels1)
router.get('/equipements/materiels/user-datas', equipementController.getAllEquipementMateriels2)
router.get('/equipements/materiels/:id', equipementController.getEquipementMaterielById)
router.get('/equipements/logiciels/:id', equipementController.getEquipementLogicielById)
router.post('/equipements/logiciel', equipementController.addEquipementLogiciel)
router.post('/equipements/materiel', equipementController.addEquipementMateriel)
router.patch('/equipements/logiciels/:id', equipementController.updateEquipementLogiciel)
router.patch('/equipements/materiels/:id', equipementController.updateEquipementMateriel)
router.delete('/equipements/logiciels/:id', equipementController.deleteEquipementLogiciel)
router.delete('/equipements/materiels/:id', equipementController.deleteEquipementMateriel)

export default router
