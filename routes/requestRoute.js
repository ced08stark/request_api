import requestController from '../controllers/requestController.js'
import express from 'express'
import { uploadFiles } from '../middlewares/multer.js'
import multer from 'multer'

const router = express.Router()

router.get('/requests', requestController.getAllRequest)
router.get('/requests/:id', requestController.getRequestById)
router.post('/request', uploadFiles, requestController.addRequest)
router.patch('/requests/:id', requestController.updateRequest)
router.delete('/requests/:id', requestController.deleteRequest)

export default router
