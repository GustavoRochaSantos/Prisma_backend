
import { Router } from 'express'
import logAcess from '../middleware/logAcess'
import ensureAuthenticated from '../middleware/ensureAuhtenticated'
import AuthRoutes from './auth'
import UserRoutes from './user'
import LogRoutes from './logAccess'
const routes = Router()

routes.get('/', (req, res) => {
  res.json({ message: 'Server on' })
})

routes.use('/log', LogRoutes)
routes.use('/user', ensureAuthenticated, logAcess, UserRoutes)
routes.use('/auth', logAcess, AuthRoutes)

export default routes
