import {HandleFn} from "./types";

export type Composer = (handler: HandleFn) => HandleFn
