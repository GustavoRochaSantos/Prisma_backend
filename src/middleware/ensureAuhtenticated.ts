import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import AppErrors from '../config/AppErrors'
import authConfig from '../config/Auth'

interface TokenPayload {
  userId: number
}
function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const token = request.headers.authorization

  if (!token) throw new AppErrors('Invalid Token')

  const decodedToken = verify(token, authConfig.jwt.secret)

  const { userId } = decodedToken as TokenPayload

  request.user = {
    id: userId
  }

  return next()
}

export default ensureAuthenticated
