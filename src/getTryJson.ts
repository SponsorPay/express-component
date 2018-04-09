import {ComposeElement} from "./composeElement";
import {ErrorRequestHandler} from "express";
import {Handler} from "./handler"
import {Get} from "./get";
import {TryJson} from "./tryJson"

export interface GetTryJsonParams {
  path: string;
  child: ComposeElement;
  onCatch: ErrorRequestHandler;
}

export interface GetTryJson extends GetTryJsonParams {

}

export class GetTryJson {
  constructor(params: GetTryJsonParams) {
    Object.assign(this, params)
  }

  render() {
    return new Handler({
      path: this.path,
      handle: new Get({
        child: new TryJson({
          onCatch: this.onCatch,
          child: this.child
        })
      })
    })
  }
}
