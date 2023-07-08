import { IUserRequest } from 'modules/secure/DTOs/IUserRequest';
import { IUsersRepository } from '../../IUsersRepository';
import { client } from 'shared/prisma';
import { User } from '@prisma/client';
import { IUpdateUser } from 'modules/secure/interfaces/IUpdateUser';

class UsersRepository implements IUsersRepository {
    async create({
        email,
        name,
        password,
        phone_number,
        address,
    }: IUserRequest): Promise<User> {
        return await client.user.create({
            data: {
                email,
                name,
                password,
                phone_number,
                address: {
                    create: address,
                },
            },
        });
    }
    async findByEmail(email: string): Promise<User> {
        return await client.user.findUnique({
            where: { email },
        });
    }

    async findById(id: string): Promise<User> {
        return await client.user.findUnique({
            where: { id },
        });
    }

    async update({ id, data }: IUpdateUser): Promise<User> {
        return await client.user.update({
            where: { id },
            data,
        });
    }
}

export { UsersRepository };