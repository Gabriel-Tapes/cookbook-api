import { Router } from 'express'
import { createUserController } from '../useCases/usersUseCases/createUser'
import { deleteUserController } from '../useCases/usersUseCases/deleteUser'
import { editUserController } from '../useCases/usersUseCases/editUser'
import {
  getUserByEmailController,
  getUserByIdController,
  getUsersByNameController,
  getAllUsersController
} from '../useCases/usersUseCases/getUsers'

export const routes = Router()

routes.post('/users', (req, res) => {
  return createUserController.handle(req, res)
})

routes.get('/users', (req, res) => {
  return getAllUsersController.handle(req, res)
})

routes.get('/users/:id', (req, res) => {
  return getUserByIdController.handle(req, res)
})

routes.get('/users/search', (req, res) => {
  if (req.query.name) return getUsersByNameController.handle(req, res)
  else if (req.query.email) return getUserByEmailController.handle(req, res)

  return res.status(400).json({
    error: 'No id, email or name in request'
  })
})

routes.put('/users', (req, res) => {
  return editUserController.handle(req, res)
})

routes.delete('/users', (req, res) => {
  return deleteUserController.handle(req, res)
})
