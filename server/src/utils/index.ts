import { Request, Response, NextFunction } from "express"

type MiddleWare = (req: Request, res: Response, next: NextFunction) => void;

export const asyncCatcher = (middlewareFn: MiddleWare) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            middlewareFn(req, res, next);
        } catch(err) {
            next(err);
        }
    }
}