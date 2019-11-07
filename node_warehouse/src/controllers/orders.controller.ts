import { Controller, Body, Post, Get, UseGuards, Delete, Param, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiUseTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/entities';
import { CreateBookModel } from 'src/models/book/createBook.model';
import { UpdateBookModel } from 'src/models/book/updateBook.model';
import { OrdersService } from 'src/services/order.service';
import { CreateOrderModel } from 'src/models/order/createOrder.model';
import { UpdateOrderModel } from 'src/models/order/updateOrder.model';

@ApiBearerAuth()
@ApiUseTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }
 
  @Get('get/:id')
  //@UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.CLIENT)
  @ApiOkResponse({ type: String })
  async get(@Param('id') id) {
    return await this.ordersService.get(id);
  }


  @Get('getAll')
  //@UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.CLIENT)
  @ApiOkResponse({ type: String })
  async getAll() {
    return await this.ordersService.getAll();
  }


  @Post('create')
  //@UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN,UserRole.CLIENT)
  @ApiOkResponse({ type: String })
  async create(@Body() model: CreateOrderModel) {
    return await this.ordersService.create(model);
  }

  
}
