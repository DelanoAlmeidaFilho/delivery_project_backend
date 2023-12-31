import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
    static async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const authenticateUserUseCase = container.resolve(
            AuthenticateUserUseCase,
        );

        const response = await authenticateUserUseCase.execute({
            email,
            password,
        });

        return res.json(response);
    }
}

export { AuthenticateUserController };
