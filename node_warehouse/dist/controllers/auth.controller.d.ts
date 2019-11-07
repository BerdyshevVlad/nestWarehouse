import { AuthService } from '../services';
import { TokenAuthModel, UserModel, SignUpAuthModel } from '../models';
import { SignInAuthModel } from 'src/models/auth/signIn.model';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAll(): Promise<UserModel[]>;
    signIn(model: SignInAuthModel): Promise<TokenAuthModel>;
    signUp(model: SignUpAuthModel): Promise<TokenAuthModel>;
}
