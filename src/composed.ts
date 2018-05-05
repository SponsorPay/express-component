import {HandleFn} from "./types";
import {ComposeElement} from "./composeElement";

export type Composer = (handler: HandleFn) => HandleFn

export interface ComposedParams {
  child?: ComposeElement;
  handle: (handler: HandleFn) => HandleFn;
}

export interface Composed extends ComposedParams {

}

export class Composed {
  constructor(params: ComposedParams) {
    Object.assign(this, params)
  }
}
