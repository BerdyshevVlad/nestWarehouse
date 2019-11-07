import { Controller, Body, Post, Get, UseGuards, Delete, Param, Put } from '@nestjs/common';
import { AuthService } from '../services';
import { TokenAuthModel, UserModel, SignUpAuthModel } from '../models'
import {
  ApiBearerAuth,
  ApiUseTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { SignInAuthModel } from 'src/models/auth/signIn.model';
import { Roles } from 'src/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/entities';
import { async } from 'rxjs/internal/scheduler/async';
import { BooksService } from 'src/services/books.service';
import { CreateBookModel } from 'src/models/book/createBook.model';
import { UpdateBookModel } from 'src/models/book/updateBook.model';

@ApiBearerAuth()
@ApiUseTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }
 
  @Get('get/:id')
  //@UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.CLIENT)
  @ApiOkResponse({ type: String })
  async get(@Param('id') id) {
    return await this.booksService.get(id);
  }

  @Get('getAll')
  //@UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.CLIENT)
  @ApiOkResponse({ type: String })
  async getAll() {
    return await this.booksService.getAll();
  }

  @Post('create')
  //@UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.CLIENT)
  @ApiOkResponse({ type: String })
  async create(@Body() model: CreateBookModel) {
    return await this.booksService.create(model);
  }

  @Delete('delete/:id')
  //@UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.CLIENT)
  @ApiOkResponse({ type: String })
  async delete(@Param('id') id) {
    return await this.booksService.delete(id);
  }

  @Put('update')
  //@UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.CLIENT)
  @ApiOkResponse({ type: String })
  async update(@Body() model: UpdateBookModel) {
    return await this.booksService.update(model);
  }
}
