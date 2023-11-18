import getRoute from "ziggy-js"
import store from "./store"
import { Router, RouteCollection } from "./types"

export interface RouterGlobal extends RouteCollection {}

export type RouteName = keyof RouterGlobal["routes"]

export type Wildcard = keyof RouterGlobal["wildcards"]

type Routes = RouterGlobal["routes"]

export type RouteParameters<T extends RouteName> =
  | (Routes[T] extends { bindings: any }
      ? Partial<Record<keyof Routes[T]["bindings"], any>> & Record<string, any>
      : {})
  | string
  | number

export function route(): Router
export function route<T extends RouteName>(name: T, params?: RouteParameters<T>): string

export function route(name?: any, params?: any): any {
  const { url, routes, defaults } = store.getRoutes()
  const absolute = store.getAbsolute()
  return getRoute(name as any, params as any, absolute, { url, routes, defaults } as any)
}

export function current<T extends RouteName | Wildcard>(
  name?: T,
  params?: T extends RouteName ? RouteParameters<T> : {}
): boolean {
  return route().current(name, params)
}

export function defineRoutes(routes: any): void {
  store.setRoutes(routes)
}
