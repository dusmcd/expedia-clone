"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncCatcher = void 0;
const asyncCatcher = (middlewareFn) => {
    return (req, res, next) => {
        try {
            middlewareFn(req, res, next);
        }
        catch (err) {
            next(err);
        }
    };
};
exports.asyncCatcher = asyncCatcher;
