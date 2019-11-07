import { Document } from 'mongoose';
export declare enum UserRole {
    ADMIN = "admin",
    CLIENT = "user"
}
export declare class UserEntity extends Document {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    emailConfirmed: boolean;
    isActive: boolean;
    role: UserRole.CLIENT;
}
