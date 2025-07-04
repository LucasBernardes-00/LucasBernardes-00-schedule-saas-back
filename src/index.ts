import { fastifyAwilixPlugin } from '@fastify/awilix'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { fastify } from 'fastify'
import { container } from './container'
import { userRoutes } from './routes/user.routes'
import { diContext } from './shared/context/di-context'
import { authRoutes } from './routes/auth.routes'

const app = fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>()

// 🔐 Carrega .env apenas fora da produção
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//#region Plugins
app
  //#region CORS
  .register(cors, {
    origin: '*', //TODO:  Ajustar para o domínio do front-end quando fizer o deploy
  })
  //#endregion
  //#region JWT
  .register(jwt, {
    secret: process.env.JWT!
  })
  //#endregion
  //#region Awilix
  .register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
    strictBooleanEnforced: true,
  })
  //#endregion
  //#region Swagger
  .register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'SAAS Schedule API',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      }
    }
  })
  .register(fastifySwaggerUi, {
    routePrefix: '/docs'
  })
  //#endregion
//#endregion

// Cria um escopo novo para cada requisição
app.addHook('onRequest', (request, reply, done) => {
  const scope = container.createScope()
  request.diScope = scope

  diContext.run(scope, () => {
    done()
  })
})

app.register(authRoutes, { prefix: '/auth' })
app.register(userRoutes, { prefix: '/user' })

const start = async () => {
  try {
    await app.listen({ port: 3000 }) // host opcional, bom para docker
    app.log.info(`Server listening at http://localhost:3000/docs`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
