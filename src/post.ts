import {HandleFn} from "./types";
import {Composed} from "./composed";
import {JsonParams} from "./json";
import {ComposeElement} from "./composeElement";

export interface PostParams {
  child: ComposeElement;
}

export interface Post extends PostParams {

}

export class Post {
  constructor(params: JsonParams) {
    Object.assign(this, params)
  }

  postHandler: (handler: HandleFn) => HandleFn = (handler: HandleFn) => async (req, res, next) => {
    if (req.method === "POST") {
      handler(req, res, next)
    } else {
      next()
    }
  }

  render() {
    return new Composed({
      handle: this.postHandler,
      child: this.child
    })
  }
}
