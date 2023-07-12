import adminController from '../controllers/adminController.js'
import express from 'express'
import {uploadImage} from '../middlewares/multer.js'

const router = express.Router()

router.get('/administrators', adminController.getAllAdmin)
router.get('/administrator/:id', adminController.getAdminById)
router.post('/administrator/sign', uploadImage.single('image'), adminController.signUpAdmin)
router.post('/administrator/login', adminController.login)

export default router
