import { Router } from 'express'
import { routes as usersRoutes } from './usersRoutes'

export const routes = Router()

routes.use(usersRoutes)