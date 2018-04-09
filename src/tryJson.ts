import {Try} from "./try";
import {Json} from "./json";
import {ErrorRequestHandler} from "express";
import {ComposeElement} from "./composeElement";

export interface TryJsonParams {
  child: ComposeElement;
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
