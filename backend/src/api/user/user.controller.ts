import {Request, Response} from 'express'
import * as userQueries from './user.query.js'

export const createUser = async (req: Request, res: Response) => {
  try {
    // Validate or sanitize data at API level as needed (e.g., taxNumber length)
    const user = await userQueries.createUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to create user'})
  }
}

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userQueries.getUsers()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to fetch users'})
  }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const user = await userQueries.getUserById(id)
    if (!user) {
      res.status(404).json({error: 'User not found'})
    } else {
      res.json(user)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to fetch user'})
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const updatedUser = await userQueries.updateUser(id, req.body)
    res.json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to update user'})
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    await userQueries.deleteUser(id)
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to delete user'})
  }
}
