import express from 'express'
import * as offerController from './offer.controller.js'
import { validateBody } from '../../middlewares/validator.js'
import { offerSchema, OfferSchemaType } from '../../validators/offer.schema.js'

const router = express.Router()

router.post('/', validateBody<OfferSchemaType>(offerSchema), offerController.createOffer)

router.get('/:id', offerController.getOfferById)

router.get('/task/:taskId', offerController.getOffersByTask)

router.get('/provider/:providerId', offerController.getOffersByProvider)

router.put(
  '/:id',
  validateBody<Partial<OfferSchemaType>>(offerSchema.partial()),
  offerController.updateOffer
)

router.delete('/:id', offerController.deleteOffer)

export default router
