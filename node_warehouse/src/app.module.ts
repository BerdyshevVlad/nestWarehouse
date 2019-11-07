import "reflect-metadata";
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './common/jwt.strategy';


import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BooksController } from "./controllers/books.controller";
import { BooksService } from "./services/books.service";
import { OrdersController } from "./controllers/orders.controller";
import { OrdersService } from "./services/order.service";
import { UserSchema,BookSchema,OrderSchema } from "./database-schemas/entity.schema";


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://giftshare:12wqasxzSW@gettingstarted-fpg58.mongodb.net/bookMarket?retryWrites=true',{
      "useNewUrlParser": true,
    }),
    MongooseModule.forFeature([{name: 'UserEntity', schema: UserSchema},{name: 'BookEntity', schema: BookSchema},{name:'OrderEntity',schema:OrderSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AuthController,BooksController,OrdersController],
  providers: [
    AuthService, 
    JwtStrategy,
    BooksService,
    OrdersService
  ]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}
