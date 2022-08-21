import { ForbiddenError } from '@/application/errors'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { auth } from '@/main/middlewares'

import { sign } from 'jsonwebtoken'
import request from 'supertest'

describe('Login Routes ', () => {
  it('should return 403 if authorization header was not provide', async () => {
    app.get('/fake_route', auth)

    const { status, body } = await request(app).get('/fake_route')

    expect(status).toBe(403)
    expect(body.error).toBe(new ForbiddenError().message)
  })

  it('should return 403 if authorization header was not provide', async () => {
    const authorization = sign({ key: 'any_user_id' }, env.jwtSecret)

    app.get('/fake_route', auth, (req, res) => {
      res.json(req.locals)
    })

    const { status, body } = await request(app)
      .get('/fake_route')
      .set({ authorization })

    expect(status).toBe(200)
    expect(body).toEqual({ userId: 'any_user_id' })
  })
})