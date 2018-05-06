import {ErrorRequestHandler} from "express";
import {Element} from "./element"
import {Get} from "./get";
import {TryJson} from "./tryJson"

export interface GetTryJsonParams {
  child: Element;
  onCatch: ErrorRequestHandler;
}

export interface GetTryJson extends GetTryJsonParams {

}

export class GetTryJson {
  constructor(params: GetTryJsonParams) {
    Object.assign(this, params)
  }

  render() {
    return new Get({
      child: new TryJson({
        onCatch: this.onCatch,
        child: this.child
      })
    })
  }
}
