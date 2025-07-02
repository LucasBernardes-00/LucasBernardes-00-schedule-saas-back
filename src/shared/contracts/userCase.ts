export interface IUseCase<Input, Output> {
  execute(request: Input): Promise<Output> | Output
}
