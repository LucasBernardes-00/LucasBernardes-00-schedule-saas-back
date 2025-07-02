import { Static } from "@sinclair/typebox"
import { LoginInput } from "./loginInput"

export type LoginCredentialsDTO = Static<typeof LoginInput>
