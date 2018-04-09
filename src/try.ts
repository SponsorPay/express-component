import {HandleFn} from "./types";
import {Composed} from "./composed";
import {ErrorRequestHandler} from "express";
import {ComposeElement} from "./composeElement";

export interface TryParams {
  onCatch: ErrorRequestHandler;
  child: ComposeElement;
}

export interface Try extends TryParams {

}

export class Try {
  constructor(params: TryParams) {
    Object.assign(this, params)
  }

  tryHandler: (handler: HandleFn) => HandleFn = (handler: HandleFn) => async (req, res, next) => {
    try {
      await handler(req, res, next)
    } catch (e) {
      this.onCatch(e, req, res, next)
    }
  }

  render() {
    return new Composed({
      handle: this.tryHandler,
      child: this.child
    })
  }
}
