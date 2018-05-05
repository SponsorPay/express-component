import {Element} from "./element"
import {Middleware} from "./middleware"
import {HandleFn} from "./types";
import {JsonParams} from "./json";

export interface GetParams {
  child: Element;
}

export interface Get extends GetParams {

}

export class Get {
  constructor(params: JsonParams) {
    Object.assign(this, params)
  }

  getHandler: (handler: HandleFn) => HandleFn = (handler: HandleFn) => async (req, res, next) => {
    if (req.method === "GET") {
      handler(req, res, next)
    } else {
      next()
    }
  }

  render() {
    return new Middleware({
      handle: this.getHandler,
      child: this.child
    })
  }
}
