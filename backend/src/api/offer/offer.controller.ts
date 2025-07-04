import { Handler } from 'express'
import * as offerQuery from './offer.query.js'
import { OfferSchemaType } from '../../validators/offer.schema.js'

export const createOffer: Handler = async (req, res, next) => {
  try {
    const input = req.body as OfferSchemaType
    const offer = await offerQuery.createOffer(input)
    res.status(201).json({ message: 'Offer created successfully', offer })
  } catch (error) {
    next(error)
  }
}

export const getOfferById: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const offer = await offerQuery.getOfferById(id)
    if (!offer) {
      res.status(404).json({ error: 'Offer not found' })
      return
    }
    res.json({ offer })
  } catch (error) {
    next(error)
  }
}

export const getOffersByTask: Handler = async (req, res, next) => {
  try {
    const taskId = Number(req.params.taskId)
    const offers = await offerQuery.getOffersByTask(taskId)
    res.json({ offers })
  } catch (error) {
    next(error)
  }
}

export const getOffersByProvider: Handler = async (req, res, next) => {
  try {
    const providerId = Number(req.params.providerId)
    const offers = await offerQuery.getOffersByProvider(providerId)
    res.json({ offers })
  } catch (error) {
    next(error)
  }
}

export const updateOffer: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const input = req.body as Partial<OfferSchemaType>
    const offer = await offerQuery.updateOffer(id, input)
    res.json({ message: 'Offer updated successfully', offer })
  } catch (error) {
    next(error)
  }
}

export const deleteOffer: Handler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    await offerQuery.deleteOffer(id)
    res.json({ message: 'Offer deleted successfully' })
  } catch (error) {
    next(error)
  }
}
