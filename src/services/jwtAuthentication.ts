import jwt from 'jsonwebtoken'
import authConfig from '../config/Auth'

interface IParmIn{
    userId?: number,
    token?:string,
}

class JWTAuthentication {
  public async generateToken ({ userId }:IParmIn) {
    const token = jwt.sign({ userId }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
      algorithm: 'HS512'
    })

    return token
  }

  public async decodeToken ({ token }:IParmIn) {

  }
}

export default JWTAuthentication
