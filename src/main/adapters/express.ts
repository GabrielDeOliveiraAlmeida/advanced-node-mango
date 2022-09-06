import { Controller } from '@/application/controllers'

import { Request, RequestHandler, Response } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req: Request, res: Response) => {
  const { data, statusCode } = await controller.handle({ ...req.body, ...req.locals })
  const json = [200, 204].includes(statusCode) ? data : { error: data.message }
  res.status(statusCode).json(json)
}
