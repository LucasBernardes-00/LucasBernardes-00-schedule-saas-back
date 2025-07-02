import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { FastifyRequest, FastifySchema, RawRequestDefaultExpression, RawServerDefault, RouteGenericInterface } from "fastify"

export type FastifyRequestTypeBox<TSchema extends FastifySchema> = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression,
  TSchema,
  TypeBoxTypeProvider
>
