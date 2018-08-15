import {IRouter} from "express-serve-static-core"
import {HandleFn} from "./types";

export type Composer = (handler: HandleFn, router?: IRouter) => HandleFn
