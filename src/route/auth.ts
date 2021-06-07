import { ClientError_4xx as httpCode } from './../config/httpCodes'
import { compare } from 'bcryptjs'
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import JWTAuthentication from '../services/jwtAuthentication'
import ensureAuhtenticated from '../middleware/ensureAuhtenticated'

const { user } = new PrismaClient()

const AuthRoutes = Router()

AuthRoutes.get('/login', async (req, res) => {
  const { userEmail, userPassword } = req.body

  if (!userEmail) { return res.status(httpCode.Unauthorized).json({ message: 'User/Password is incorrect' }) }
  if (!userPassword) { return res.status(httpCode.Unauthorized).json({ message: 'User/Password is incorrect' }) }

  const userExist = await user.findUnique({
    where: { userEmail }
  })

  if (!userExist) {
    return res.status(httpCode.Unauthorized).json({ message: 'User/Password is incorrect' })
  }

  const equals = await compare(userPassword, userExist.userPassword)

  if (equals) {
    const jwt = new JWTAuthentication()

    const token = await jwt.generateToken({
      userId: userExist.userId
    })

    return res.json({ token })
  } else {
    return res.status(httpCode.Unauthorized).json({ message: 'User/Password is incorrect' })
  }
})

AuthRoutes.get('/logout', async (req, res) => {
  res.json({ message: 'logout', token: null })
})

AuthRoutes.get('/testToken', ensureAuhtenticated, async (req, res) => {
  res.json({ message: 'tudo ok' })
})
export default AuthRoutes
