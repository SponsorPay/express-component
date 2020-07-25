import {IRouter} from "express-serve-static-core"
import {HandleFn} from "./types";

export declare type Composer = (handler: HandleFn) => HandleFn;
