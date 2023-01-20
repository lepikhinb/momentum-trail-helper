import { RouterGlobal } from "./router"

let routes: RouterGlobal

export default {
  setRoutes: (payload: RouterGlobal) => (routes = payload),

  /** @ts-ignore */
  getRoutes: () => (typeof window !== "undefined" && window.trail ? window.trail : routes),
}
