import {Element} from "./element"
import {ErrorRequestHandler} from "express";
import {Handler} from "./handler"
import {Method, MethodName} from "./method"
import {TryJson} from "./tryJson"
import {HandleFn} from "./types"

export interface TryMethodParams {
  child: Element
  method: MethodName
}

export interface TryMethod extends TryMethodParams {

}

export class TryMethod {
  static handler = (method: MethodName, path: string, handle: HandleFn) => new TryMethod({
    method,
    child: new Handler({
      handle,
      path
    })
  })

  static post = (path: string, handle: HandleFn) => TryMethod.handler("POST", path, handle)
  static get = (path: string, handle: HandleFn) => TryMethod.handler("GET", path, handle)
  static delete = (path: string, handle: HandleFn) => TryMethod.handler("DELETE", path, handle)
  static put = (path: string, handle: HandleFn) => TryMethod.handler("PUT", path, handle)

  constructor(params: TryMethodParams) {
    Object.assign(this, params)
  }

  context!: {
    onCatch: ErrorRequestHandler
  }

  render() {
    return new Method({
      child: new TryJson({
        child: this.child,
        onCatch: this.context.onCatch
      }),
      method: this.method
    })
  }
}
