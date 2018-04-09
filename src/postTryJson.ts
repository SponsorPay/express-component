import {ComposeElement} from "./composeElement";
import {ErrorRequestHandler} from "express";
import {Handler} from "./handler"
import {Post} from "./post";
import {TryJson} from "./tryJson"

export interface PostTryJsonParams {
  path: string;
  child: ComposeElement;
  onCatch: ErrorRequestHandler;
}

export interface PostTryJson extends PostTryJsonParams {

}

export class PostTryJson {
  constructor(params: PostTryJsonParams) {
    Object.assign(this, params)
  }

  render() {
    return new Handler({
      path: this.path,
      handle: new Post({
        child: new TryJson({
          onCatch: this.onCatch,
          child: this.child
        })
      })
    })
  }
}
