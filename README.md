# express-component
Component-based routing on top of Express

[![Build Status](https://travis-ci.org/kobiburnley/express-component.svg?branch=master)](https://travis-ci.org/kobiburnley/express-component)

```typescript
import * as express from "express"
import {withRouterFactory, Router, Get, HandleFn, TryJson, Component, Handler, GetTryJson} from "express-component";

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
          path: "/nice",
          child: this.nice,
          onCatch: this.handleCatch
        })
      ]
    })
  }
}

const app = express()
withRouterFactory(express.Router)(new MyComponent(), app)
app.listen(9090)
```
