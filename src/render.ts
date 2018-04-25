import {IRouter} from "express-serve-static-core"
import {Handler} from "./handler";
import {Router} from "./router";
import {Component} from "./component";
import {Element} from "./element";
import {HandleFn} from "./types";
import {Composed} from "./composed";

function composeHandlers(e: any, context?: any): HandleFn {
  if (e == null) {
    return e
  }
  if (isSimple(e)) {
    return e
  }
  if (e instanceof Composed) {
    const child = composeHandlers(e.child, context)
    return e.handle(child)
  }
  if (isComponent(e)) {
    e.context = context
    return composeHandlers(e.render(), e.getChildContext && e.getChildContext() || context)
  }
  throw TypeError(`Illegal instance type ${e && e.constructor.name}`)
}


export type RouterFactory = (...args: any[]) => IRouter

export function withRouterFactory(factory: RouterFactory) {
  return function render(instance: Element, router: IRouter, context?: any) {
    if (instance instanceof Handler) {
      const handler = composeHandlers(instance.handle, context)
      if (instance.path) {
        router.use(instance.path, handler)
      } else {
        router.use(handler)
      }
    } else if (instance instanceof Router) {
      const childRouter = factory()
      for (const child of instance.children) {
        render(child, childRouter, context)
      }
      if (instance.path) {
        router.use(instance.path, childRouter)
      } else {
        router.use(childRouter)
      }
    } else if (isComponent(instance)) {
      instance.context = context
      render(instance.render(), router, instance.getChildContext && instance.getChildContext() || context)
    }

    // else {
    //   throw TypeError(`Illegal instance type ${instance && instance.constructor.name}`)
    // }
  }
}


function isComponent(e: any): e is Component {
  return e != null && typeof e.render == "function"
}

function isSimple(e: any): e is HandleFn {
  return e != null && typeof e == "function"
}
