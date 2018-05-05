import {Handler} from "./handler";
import {Component} from "./component";
import {Middleware} from "./middleware"
import {Router} from "./router";

export type Element = Handler | Router | Component | Middleware;
