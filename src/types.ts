import {NextFunction, Request, Response} from "express";

export type HandleFn = (req: Request, res: Response, next: NextFunction, handle?: HandleFn) => any;
