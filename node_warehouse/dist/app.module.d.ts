import "reflect-metadata";
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
export declare const UserSchema: any;
export declare class ApplicationModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
