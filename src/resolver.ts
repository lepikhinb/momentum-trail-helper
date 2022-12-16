import { RouterGlobal } from "./router"

let routes: RouterGlobal

export default {
  setRoutes: (payload: RouterGlobal) => (routes = payload),

  getRoutes: () => routes,
}
