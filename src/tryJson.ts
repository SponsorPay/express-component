import {Element} from "./element"
import {Try} from "./try";
import {Json} from "./json";
import {ErrorRequestHandler} from "express";

export interface TryJsonParams {
  child: Element;
  onCatch: ErrorRequestHandler;
}

export interface TryJson extends TryJsonParams {

}

export class TryJson {
  constructor(params: TryJsonParams) {
    Object.assign(this, params)
  }

  render() {
    return new Try({
      onCatch: this.onCatch,
      child: new Json({
        child: this.child
      })
    })
  }
}
