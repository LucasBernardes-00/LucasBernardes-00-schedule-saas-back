export interface IErrorManager {
  addError(error: string): void
  hasErrors(): boolean
  getErrors(): string[]
}
