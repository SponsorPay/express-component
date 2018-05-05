import {Element} from "./element"

export interface Component {
  getChildContext?(): any;
  context?: any;
  render(): Element;
}
