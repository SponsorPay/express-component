import {HandleFn} from "./types";
import {Composed} from "./composed";
import {JsonParams} from "./json";
import {ComposeElement} from "./composeElement";

export interface GetParams {
  child: ComposeElement;
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
    return new Composed({
      handle: this.getHandler,
      child: this.child
    })
  }
}
