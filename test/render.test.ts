import {ErrorRequestHandler} from "express"
import * as express from "express"
import {withRouterFactory, Router, Get, HandleFn, TryJson, Component, Handler, GetTryJson, TryMethod} from "../src";

class MyComponent implements Component {
  nice: HandleFn = (req, res) => ({nice: "nice"})
  end: HandleFn = (req, res) => {
    throw new Error("end")
  }

  handleCatch = (err: any) => {
    console.error(err)
  }

  onCatch: ErrorRequestHandler = (err, req, res) => {
    console.error(err)
    res.status(err.statusCode || 500).json({message: err.message})
  }

  getChildContext() {
    return this
  }

  render() {
    return new Router({
      path: "/api",
      children: [
        TryMethod.get("/nice", this.nice),
        TryMethod.get("/end", this.end),
      ]
    })
  }
}

describe("render.test", function () {
  this.timeout(100000)
  it("should render", async () => {
    const app = express()
    withRouterFactory(express.Router)(new MyComponent(), app)
  })
})
