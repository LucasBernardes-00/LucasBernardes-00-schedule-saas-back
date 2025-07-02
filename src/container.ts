import { asClass, asValue, createContainer, InjectionMode } from 'awilix'
import UserController from './modules/User/controller/user.controller'
import { ErrorManager } from './shared/core/internal/errorManager.core'
import { PrismaClient } from '@prisma/client'
import { CreateUserUseCase } from './modules/User/useCase/createUser.usecase'
import { UserRepositorie } from './modules/User/repositorie/userRepositorie'

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
  strict: true
})

container.register({
  prisma: asValue(new PrismaClient()),
  errorManager: asClass(ErrorManager).scoped(),
  createUserUseCase: asClass(CreateUserUseCase).scoped(),
  userRepositorie: asClass(UserRepositorie).scoped(),
  userController: asClass(UserController).scoped()
})

export { container }
