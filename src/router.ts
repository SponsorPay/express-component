import {Element} from "./element";

export interface RouterParams {
  path: string;
  children: Element[];
}

export interface Router extends RouterParams {

}

export class Router {
  constructor(params: RouterParams) {
    Object.assign(this, params)
  }
}
