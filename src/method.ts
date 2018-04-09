import {Component} from "./component";
import {Handler} from "./handler"
import {HandleFn} from "./types";

export interface MethodParams {
  method: "GET" | "POST" | "DELETE" | "PUT" | "OPTIONS"
  path?: string;
  handle: HandleFn;
}

export interface Method extends MethodParams, Component {

}

export class Method implements Component {
  constructor(params: MethodParams) {
    Object.assign(this, params)
  }

  checkMethod: HandleFn = (req, res, next) => {
    if (req.method === this.method) {
      this.handle(req, res, next)
    } else {
      next()
    }
  }

  render(): any {
    const {path} = this
    return new Handler({
      path, handle: this.checkMethod
    })
  }
}
