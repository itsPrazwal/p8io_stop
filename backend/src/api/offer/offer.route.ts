import express from 'express'
import * as offerController from './offer.controller.js'
import { validateBody } from '../../middlewares/validator.js'
import {
  offerSchema,
  OfferSchemaType,
  offerStatusSchema,
  OfferStatusSchemaType
} from '../../validators/offer.schema.js'

const router = express.Router()

router.post('/', validateBody<OfferSchemaType>(offerSchema), offerController.createOffer)

router.get('/provider', offerController.getOffersByProvider)

router.get('/task/:taskId', offerController.getOffersByTask)

router.put(
  '/status/:id',
  validateBody<Partial<OfferStatusSchemaType>>(offerStatusSchema),
  offerController.updateOfferStatus
)

router.get('/:id', offerController.getOfferById)

router.delete('/:id', offerController.deleteOffer)

export default router
