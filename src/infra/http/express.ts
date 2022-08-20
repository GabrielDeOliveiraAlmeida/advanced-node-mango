import { Controller } from '@/application/controllers'

import { Request, RequestHandler, Response } from 'express'

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    const { data, statusCode } = await controller.handle({ ...req.body })
    const json = statusCode === 200 ? data : { error: data.message }
    if (statusCode === 200) {
      res.status(200).json(data)
    } else {
      res.status(statusCode).json(json)
    }
  }
}
