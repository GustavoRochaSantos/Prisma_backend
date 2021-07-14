// -- Basic imports
import 'dotenv/config'
import express, { json, NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import AppErrors from './config/AppErrors'
import routes from './route'

const serverUrl = process.env.SERVER_URL
const serverPort = process.env.SERVER_PORT
const app = express()

app.use(json())
app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppErrors) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      })
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      detail: {
        error: true,
        name: err.name,
        message: err.message,
        stack: err.stack
      }
    })
  }
)

app.listen(serverPort, () => {
  console.log(`Server is running in ${serverUrl}:${serverPort}`)
})
