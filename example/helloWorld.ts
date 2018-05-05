import * as express from "express"
import {withRouterFactory, Router, Get, HandleFn, TryJson, Component, Handler, GetTryJson} from "../src";

class MyComponent implements Component {
  nice: HandleFn = (req, res) => ({nice: "nice"})

  handleCatch = (err: any) => {
    console.error(err)
  }

  getChildContext() {
    return "The context!"
  }

  render() {
    return new Router({
      path: "/api",
      children: [
        new GetTryJson({
          child: new Handler({
            path: "/nice",
            handle: this.nice,
          }),
          onCatch: this.handleCatch
        })
      ]
    })
  }
}

const app = express()
withRouterFactory(express.Router)(new MyComponent(), app)
app.listen(9090, () => {
  console.log("listening...")
})
