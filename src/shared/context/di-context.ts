import { AsyncLocalStorage } from "async_hooks"
import { AwilixContainer } from "awilix"

export const diContext = new AsyncLocalStorage<AwilixContainer>()

export function getCurrentScope(): AwilixContainer {
  const scope = diContext.getStore()
  if (!scope) throw new Error('DI Scope not available')
  return scope
}
