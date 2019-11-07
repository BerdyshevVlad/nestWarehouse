import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenAuthModel, SignUpAuthModel } from 'src/models';
import { SignInAuthModel } from 'src/models/auth/signIn.model';
import { UserEntity, UserRole } from 'src/entities/user.entity';
import { UserModel } from '../models'
import { Md5 } from 'ts-md5/dist/md5';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('UserEntity') private readonly userRepository: Model<UserEntity>,
        private readonly jwtService: JwtService
    ) {

    }

    async signIn(model: SignInAuthModel): Promise<TokenAuthModel> {
        const user = await this.userRepository.findOne({
            email: model.email
        })
        const accessToken = this.jwtService.sign({
            email: user.email,
            role: user.role,
            name: user.firstName,
            surname: user.lastName
        });
        return {
            expiresIn: 3600,
            accessToken
        };
    }

    async signUp(model: SignUpAuthModel): Promise<TokenAuthModel> {
        const user = await this.userRepository.findOne({
            email: model.email
        });

        if (user) {
            throw Error('User has already exist!')
        }

        const passwordHash = Md5.hashAsciiStr(model.password)

        var userEntity = new UserEntity();
        userEntity.email=model.email;
        userEntity.isActive= true;
        userEntity.firstName= model.firstName;
        userEntity.lastName= model.lastName;
        userEntity.passwordHash= passwordHash.toString();
        userEntity.role= UserRole.CLIENT;

        const newUser = this.userRepository.create(userEntity);

        const accessToken = this.jwtService.sign({
            email: newUser.email,
            role: newUser.role,
            name: newUser.firstName,
            surname: newUser.lastName
        });

        return {
            expiresIn: 3600,
            accessToken
        };
    }

    async logOut(){

    }

    async getAll(): Promise<UserModel[]> {
        const users = await this.userRepository.find().exec();
        console.log(users);
        return users.map(user => {
            return new UserModel(user);
        })
    }
}
