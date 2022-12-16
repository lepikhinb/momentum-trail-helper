import { App } from "vue"
import resolver from "./resolver"

export interface TrailPluginOptions {
  routes: any
}

export const trail = (app: App, options: TrailPluginOptions) => {
  resolver.setRoutes(options.routes)
}
