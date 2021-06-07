import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const { logAccess } = new PrismaClient()

const logAcess = async (request: Request, response:Response, next:NextFunction) => {
  const today = new Date()

  const userId = request.user && request.user.id ? request.user.id : 0

  await logAccess.create({
    data: {
      logAccessUserId: userId,
      logAccessMethod: request.method,
      logAccessUrl: request.originalUrl,
      logAccessYear: today.getFullYear(),
      logAccessMonth: (today.getMonth() + 1),
      logAccessDay: today.getDate()
    }
  })

  next()
}

export default logAcess
