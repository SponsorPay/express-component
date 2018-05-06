import {Composer} from "./composed"
import {Element} from "./element"

export interface MiddlewareParams {
  child: Element;
  handle: Composer;
}

export interface Middleware extends MiddlewareParams {

}

export class Middleware {
  constructor(params: MiddlewareParams) {
    Object.assign(this, params)
  }
}
