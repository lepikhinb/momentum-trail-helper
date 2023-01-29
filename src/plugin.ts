import { App } from "vue"
import store from "./store"
import type { RouterGlobal } from "./router"

export interface TrailPluginOptions {
  routes?: RouterGlobal
}

export const trail = (app: App, options?: TrailPluginOptions) => {
  if (options?.routes) {
    store.setRoutes(options.routes)
  }
}
