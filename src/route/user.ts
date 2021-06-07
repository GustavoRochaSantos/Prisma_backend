import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import UserCreate from '../services/userCreate'

const { user } = new PrismaClient()

const UserRoutes = Router()

UserRoutes.get('/', async (req, res) => {
  const users = await user.findMany({
    select: {
      userId: true,
      userName: true,
      userEmail: true,
      userCanChangePassword: true,
      userIsBlocked: true,
      userIsActive: true
    }
  })
  res.json(users)
})

UserRoutes.get('/:userEmail', async (req, res) => {
  const { userEmail } = req.params

  const users = await user.findUnique({
    where: {
      userEmail
    },
    select: {
      userId: true,
      userName: true,
      userEmail: true,
      userCanChangePassword: true,
      userIsBlocked: true,
      userIsActive: true
    }
  })
  if (users) { res.json(users) } else { res.json({ message: 'Not found.' }) }
})

UserRoutes.post('/', async (req, res) => {
  const { userName, userEmail, userPassword } = req.body

  const create = new UserCreate()

  const newData = await create.execute({ userName, userEmail, userPassword })

  res.json({ newData })
})
export default UserRoutes
