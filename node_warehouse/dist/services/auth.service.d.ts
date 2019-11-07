import { JwtService } from '@nestjs/jwt';
import { TokenAuthModel, SignUpAuthModel } from 'src/models';
import { SignInAuthModel } from 'src/models/auth/signIn.model';
import { UserEntity } from 'src/entities/user.entity';
import { UserModel } from '../models';
import { Model } from 'mongoose';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Model<UserEntity>, jwtService: JwtService);
    signIn(model: SignInAuthModel): Promise<TokenAuthModel>;
    signUp(model: SignUpAuthModel): Promise<TokenAuthModel>;
    getAll(): Promise<UserModel[]>;
}
