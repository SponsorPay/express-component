import {Component} from "./component";
import {Element} from "./element"
import {Middleware} from "./middleware"
import {HandleFn} from "./types"

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

  checkMethod: (handler: HandleFn) => HandleFn = (handler: HandleFn) => async (req, res, next) => {
    if (req.method === this.method) {
      handler(req, res, next)
    } else {
      next()
    }
  }

  render(): any {
    return new Middleware({
      child: this.child,
      handle: this.checkMethod
    })
  }
}
