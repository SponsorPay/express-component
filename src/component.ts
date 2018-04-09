export interface Component {
  getChildContext?(): any;
  context?: any;
  render(): any;
}
