import {Element} from "./element"
import {ErrorRequestHandler} from "express";
import {Handler} from "./handler"
import {MethodName} from "./method"
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
      path,
      method
    })
  })

  static post = (path: string, handle: HandleFn) => TryMethod.handler("post", path, handle)
  static get = (path: string, handle: HandleFn) => TryMethod.handler("get", path, handle)
  static delete = (path: string, handle: HandleFn) => TryMethod.handler("delete", path, handle)
  static put = (path: string, handle: HandleFn) => TryMethod.handler("put", path, handle)

  constructor(params: TryMethodParams) {
    Object.assign(this, params)
  }

  context!: {
    onCatch: ErrorRequestHandler
  }

  render() {
    return new TryJson({
      child: this.child,
      onCatch: this.context.onCatch
    })
  }
}
