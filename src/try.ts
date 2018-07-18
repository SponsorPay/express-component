import {Element} from "./element"
import {Middleware} from "./middleware"
import {HandleFn} from "./types";
import {ErrorRequestHandler} from "express";

export interface TryParams {
  onCatch: ErrorRequestHandler;
  child: Element;
}

export interface Try extends TryParams {

}

export class Try {
  constructor(params: TryParams) {
    Object.assign(this, params)
    if (typeof this.onCatch !== "function") {
      throw new Error("onCatch must be a function")
    }
  }

  tryHandler: (handler: HandleFn) => HandleFn = (handler: HandleFn) => async (req, res, next) => {
    try {
      await handler(req, res, next)
    } catch (e) {
      this.onCatch(e, req, res, next)
    }
  }

  render() {
    return new Middleware({
      handle: this.tryHandler,
      child: this.child
    })
  }
}
