import { RouteParams } from "ziggy-js"
import { RouteName, RouteParameters, Wildcard } from "./router"

interface Route {
  uri: string
  methods: Array<"GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE">
  bindings: Record<string, string>
}

export interface RouteCollection {
  url: string
  port: number | null
  routes: Record<string, Route>
  wildcards: Record<string, []>
  defaults: Record<string, any>
}

export interface Router extends String {
  /**
   * Get the name of the route matching the current window URL, or, given a route name
   * and parameters, check if the current window URL and parameters match that route.
   *
   * @example
   * // at URL https://ziggy.dev/posts/4 with 'posts.show' route 'posts/{post}'
   * route().current(); // 'posts.show'
   * route().current('posts.index'); // false
   * route().current('posts.show'); // true
   * route().current('posts.show', { post: 1 }); // false
   * route().current('posts.show', { post: 4 }); // true
   */
  current(): string | undefined

  current<T extends RouteName | Wildcard>(
    name?: T,
    params?: T extends RouteName ? RouteParameters<T> : {}
  ): boolean

  /**
   * @deprecated since v1.0, use `has()` instead.
   */
  check(name: string): boolean

  /**
   * Check whether the given route exists.
   */
  has(name: string): boolean

  /**
   * Get all parameter values from the current window URL.
   *
   * @example
   * // at URL https://tighten.ziggy.dev/posts/4?lang=en with 'posts.show' route 'posts/{post}' and domain '{team}.ziggy.dev'
   * route().params; // { team: 'tighten', post: 4, lang: 'en' }
   */
  get params(): RouteParams

  toString(): string

  valueOf(): string
}
