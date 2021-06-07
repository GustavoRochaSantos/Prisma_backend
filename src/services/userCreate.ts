import { PrismaClient } from '@prisma/client'
import AppErrors from '../config/AppErrors'
import { hash } from 'bcryptjs'

const { user } = new PrismaClient()

interface IUser{
    userName: string
    userEmail:string
    userPassword:string
}

class UserCreate {
  public async execute ({ userName, userEmail, userPassword }:IUser):Promise<any> {
    if (!userName) { throw new AppErrors('Name is required.') }
    if (!userEmail) { throw new AppErrors('Email is required.') }
    if (!userPassword) { throw new AppErrors('Password is required.') }

    const exist = await user.findFirst({
      where: {
        userEmail
      }
    })

    if (exist) {
      throw new AppErrors('Record already exist.')
    }

    const hashedPassword = await hash(userPassword, 8)

    const newUser = await user.create({
      data: {
        userEmail,
        userName,
        userPassword: hashedPassword
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
    return newUser
  }
}

export default UserCreate
