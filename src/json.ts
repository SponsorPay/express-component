import {Element} from "./element"
import {Middleware} from "./middleware"
import {HandleFn} from "./types";

export interface JsonParams {
  child: Element;
}

export interface Json extends JsonParams {

}

export class Json {
  constructor(params: JsonParams) {
    Object.assign(this, params)
  }

  jsonHandler: (handler: HandleFn) => HandleFn = (handler: HandleFn) => async (req, res, next) => {
    const result = await handler(req, res, next)
    res.json(result)
  }

  render() {
    return new Middleware({
      handle: this.jsonHandler,
      child: this.child
    })
  }
}
