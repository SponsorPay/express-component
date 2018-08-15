import {IRouter} from "express-serve-static-core"
import {Handler} from "./handler";
import {Middleware} from "./middleware"
import {Router} from "./router";
import {Component} from "./component";
import {Element} from "./element";
import {HandleFn} from "./types";
import {Composer} from "./composed";

export type RouterFactory = (...args: any[]) => IRouter

export function withRouterFactory(factory: RouterFactory) {
  return function render(instance: Element, router: IRouter, mw: Composer | null = null, context?: any) {
    if (instance instanceof Handler) {
      const handler = mw != null ? mw(instance.handle, router) : instance.handle
      if (instance.path) {
        router.use(instance.path, handler)
      } else {
        router.use(handler)
      }
    } else if (isRouter(instance)) {
      const childRouter = factory()
      for (const child of instance.children) {
        render(child, childRouter, mw, context)
      }
      if (instance.path) {
        router.use(instance.path, childRouter)
      } else {
        router.use(childRouter)
      }
    } else if (instance instanceof Middleware) {
      const composer = mw != null ? (handler: HandleFn) => mw(instance.handle(handler), router) : instance.handle
      render(instance.child, router, composer, context)
    } else if (isComponent(instance)) {
      instance.context = context
      render(instance.render(), router, mw, instance.getChildContext && instance.getChildContext() || context)
    } else {
      throw TypeError(`Illegal instance type`)
    }
  }
}

function isRouter(e: any): e is Router {
  return e != null && Array.isArray(e.children)
}

function isHandler(e: any): e is Handler {
  return e != null && typeof e.render == "function"
}

function isComponent(e: any): e is Component {
  return e != null && typeof e.render == "function"
}

function isSimple(e: any): e is HandleFn {
  return e != null && typeof e == "function"
}
