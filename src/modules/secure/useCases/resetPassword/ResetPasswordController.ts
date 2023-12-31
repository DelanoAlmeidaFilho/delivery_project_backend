import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

class ResetPasswordController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const { token } = req.query;
        const { password } = req.body;

        const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

        await resetPasswordUseCase.execute(String(token), password);

        return res.status(204).send();
    }
}

export { ResetPasswordController };
