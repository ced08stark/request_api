import mediaController from '../controllers/mediaController.js'
import express from 'express'

const router = express.Router()

router.get('/medias', mediaController.getAllMedia)
router.get('/medias/:id', mediaController.getMediaById)
// router.post('/request', mediaController.addRequest)
// router.patch('/requests/:id', mediaController.updateRequest)
// router.delete('/requests/:id', mediaController.deleteRequest)

export default router
