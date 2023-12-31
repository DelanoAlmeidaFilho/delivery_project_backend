import { NextFunction, Request, Response } from 'express';
import { AppError } from 'shared/error/AppError';

const handlerError = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            error: true,
            message: error.message,
            code: error.code,
        });
    }

    console.log(error);

    return res
        .status(500)
        .json({ error: true, message: 'Internal server error.' });
};

export { handlerError };
