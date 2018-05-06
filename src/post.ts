import {Element} from "./element"
import {Middleware} from "./middleware"
import {HandleFn} from "./types";
import {JsonParams} from "./json";

export interface PostParams {
  child: Element;
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
    const {child} = this
    return new Middleware({
      handle: this.postHandler,
      child
    })
  }
}
