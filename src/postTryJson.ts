import {ErrorRequestHandler} from "express";
import {Element} from "./element"
import {Post} from "./post";
import {TryJson} from "./tryJson"

export interface PostTryJsonParams {
  child: Element;
  onCatch: ErrorRequestHandler;
}

export interface PostTryJson extends PostTryJsonParams {

}

export class PostTryJson {
  constructor(params: PostTryJsonParams) {
    Object.assign(this, params)
  }

  render() {
    return new Post({
      child: new TryJson({
        onCatch: this.onCatch,
        child: this.child
      })
    })
  }
}
