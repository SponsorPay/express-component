import {Component} from "./component";
import {Composer} from "./composed"
import {Element} from "./element"
import {Middleware} from "./middleware"
import {HandleFn} from "./types"

declare module "express-serve-static-core" {
  interface IRouter {
    ecmethod: string
  }
}

export type MethodName = "GET" | "POST" | "DELETE" | "PUT" | "OPTIONS"

export interface MethodParams {
  method: MethodName
  child: Element;
}

export interface Method extends MethodParams, Component {

}

export class Method implements Component {
  constructor(params: MethodParams) {
    Object.assign(this, params)
  }

  checkMethod: Composer = (handler: HandleFn, router) => {
    router.ecmethod = this.method
    return async (req, res, next) => {
      if (req.method === this.method) {
        handler(req, res, next)
      } else {
        next()
      }
    }
  }

  render(): any {
    return new Middleware({
      child: this.child,
      handle: this.checkMethod
    })
  }
}
