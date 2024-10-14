import { Expose } from 'class-transformer';

export class UserDto {
    @Expose()
    id_user?: number;

    @Expose()
    email?: string;

    @Expose()
    password?: string;

    @Expose()
    id_role?: number;
}