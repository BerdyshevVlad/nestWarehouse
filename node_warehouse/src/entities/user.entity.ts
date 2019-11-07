import { Document } from 'mongoose';
import { BaseEntity } from './base.entity';

export enum UserRole {
    ADMIN = "admin",
    CLIENT = "user"
}

export class UserEntity extends BaseEntity {
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    emailConfirmed: boolean;
    role: UserRole.CLIENT
}




