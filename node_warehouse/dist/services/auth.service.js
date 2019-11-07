"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("src/entities/user.entity");
const models_1 = require("../models");
const md5_1 = require("ts-md5/dist/md5");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    signIn(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                email: model.email
            });
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
        });
    }
    signUp(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                email: model.email
            });
            console.log(`User:${user}`);
            if (user) {
                throw Error('User has already exist!');
            }
            console.log(`password:${model.password}`);
            console.log(`email:${model.email}`);
            const passwordHash = md5_1.Md5.hashAsciiStr(model.password);
            console.log("Hash");
            const newUser = this.userRepository.create({
                email: model.email,
                isActive: true,
                firstName: model.firstName,
                lastName: model.lastName,
                passwordHash: passwordHash.toString(),
                role: user_entity_1.UserRole.CLIENT
            });
            const accessToken = this.jwtService.sign({
                email: newUser.email,
                role: newUser.role,
                name: newUser.firstName,
                surname: newUser.lastName
            });
            console.log("Sign up succeded. Everything is ok!");
            return {
                expiresIn: 3600,
                accessToken
            };
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.find().exec();
            return users.map(user => {
                return new models_1.UserModel(user);
            });
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('UserEntity')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map