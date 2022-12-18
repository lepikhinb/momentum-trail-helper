import getRoute from "ziggy-js"
import state from "./state"

interface Route {
  uri: string
  methods: Array<"GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE">
  bindings: Record<string, string>
}

interface Router {
  url: string
  port: number | null
  routes: Record<string, Route>
  wildcards: Record<string, []>
  defaults: Record<string, any>
}

export interface RouterGlobal extends Router {}

type RouteName = keyof RouterGlobal["routes"]

type Wildcard = keyof RouterGlobal["wildcards"]

type Routes = RouterGlobal["routes"]

type RouteParameters<T extends RouteName> =
  | (Routes[T] extends { bindings: any }
      ? Partial<Record<keyof Routes[T]["bindings"], any>> & Record<string, any>
      : {})
  | string
  | number

export function route<T extends RouteName>(name: T, params?: RouteParameters<T>) {
  const { url, routes, defaults } = state.getRoutes()

  return getRoute(name as any, params as any, true, { url, routes, defaults } as any).toString()
}

export function current<T extends RouteName | Wildcard>(
  name?: T,
  params?: T extends RouteName ? RouteParameters<T> : {}
): boolean | string {
  const { url, routes, defaults } = state.getRoutes()

  return getRoute(undefined, undefined, false, { url, routes, defaults } as any).current(
    name as string,
    params as any
  )
}

export function defineRoutes(routes: RouterGlobal): void {
  state.setRoutes(routes)
}
