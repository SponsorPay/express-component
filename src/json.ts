import {Handler, HandlerParams} from "./handler";
import {HandleFn} from "./types";
import {Composed} from "./composed";
import {ComposeElement} from "./composeElement";

export interface JsonParams {
  child: ComposeElement;
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
    return new Composed({
      handle: this.jsonHandler,
      child: this.child
    })
  }
}
