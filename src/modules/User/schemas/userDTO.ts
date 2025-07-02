import { Static } from '@sinclair/typebox'
import { CreateUserInput } from './createUserInput'

export type CreateUserDTO = Static<typeof CreateUserInput>
export type RestoreUserDTO = CreateUserDTO & { id: string }
