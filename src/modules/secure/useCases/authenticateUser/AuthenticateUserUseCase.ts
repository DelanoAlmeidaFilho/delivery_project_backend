import { compare } from 'bcryptjs';
import { IAuthenticateRequest } from 'modules/secure/DTOs/IAuthenticateRequest';
import { IAuthenticateResponse } from 'modules/secure/DTOs/IAuthenticateResponse';
import { IUsersRepository } from 'modules/secure/repository/IUsersRepository';
import { IJwtProvider } from 'shared/container/providers/JwtProvider/IJwtProvider';
import { AppError } from 'shared/error/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('JwtProvider')
        private jwtProvider: IJwtProvider,
    ) {}

    async execute({
        email,
        password,
    }: IAuthenticateRequest): Promise<IAuthenticateResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email or password incorrect!', 'auth.error');
        }

        if (!user.confirmation_email) {
            throw new AppError(
                'Confirm your email address',
                'email.confirm',
                401,
            );
        }

        const password_match = await compare(password, user.password);

        if (!password_match) {
            throw new AppError('Email or password incorrect!', 'auth.error');
        }

        const roles = user.roles.map(role => role.name);

        const access_token = this.jwtProvider.generateAccessToken(user);

        const refresh_token = await this.jwtProvider.generateRefreshToken(user);

        return {
            access_token,
            refresh_token,
            user: {
                email: user.email,
                name: user.name,
                roles,
            },
        };
    }
}

export { AuthenticateUserUseCase };
