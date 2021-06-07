import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const LogRoutes = Router()
const { logAccess } = new PrismaClient()

LogRoutes.get('/data', async (req, res) => {
  const logs = await logAccess.groupBy({
    by: ['logAccessYear', 'logAccessMonth', 'logAccessDay', 'logAccessUrl', 'logAccessMethod'],
    _count: {
      logAccessId: true
    }
  })

  return res.json(logs)
})

export default LogRoutes
