import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { OrderEntity, ProductDetails } from 'src/entities/order.entity';
import { GetOrderModel } from 'src/models/order/getOrder.model';
import { CreateOrderModel } from 'src/models/order/createOrder.model';
import { UpdateOrderModel } from 'src/models/order/updateOrder.model';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel('OrderEntity') private readonly ordersRepository: Model<OrderEntity>
    ) {}


    async get(id: string): Promise<GetOrderModel>{
        const order = await this.ordersRepository.findOne({_id:id});

        if(!order){
            throw Error('Order not found.')
        }

        let model = new GetOrderModel();
        model.id=order.id;
        model.totalAmount=order.totalAmount;
        model.totalPrice=order.totalPrice;

        let productDetails = new Array<ProductDetails>();
        order.products.forEach(product =>productDetails.push({
            amount: product.amount,
            product: product.product
        }));

        model.products.push(productDetails);

        return model;
    }


    async getAll(): Promise<GetOrderModel[]>{
        const orders = await this.ordersRepository.find().exec();

        if(!orders){
            throw Error('Orders not found.')
        }

        let modelList = new Array<GetOrderModel>();
        orders.forEach(order => {
            let model = new GetOrderModel();
            model.id=order.id;
            model.totalAmount=order.totalAmount;
            model.totalPrice=order.totalPrice;
            let productDetails = new Array<ProductDetails>();
            order.products.forEach(product =>productDetails.push({
                amount: product.amount,
                product: product.product
            }));
            model.products.push(productDetails);
            modelList.push(model);
        });

        return modelList;
    }


    async create(model: CreateOrderModel){
        let order = new OrderEntity;
        let minQuantity = 1;
        model.products.forEach(product=>
            {
            order.totalPrice+=product.product.price;
            order.totalAmount+=!product.amount?minQuantity:product.amount;
            let orderDetails=new ProductDetails();
            orderDetails.amount=product.amount;
            orderDetails.product=product.product;
                order.products.push(orderDetails)
            });
       
        const nweOrder = this.ordersRepository.create(order);

        return "Order was created successfully";
    }



    async delete(id: string){
        const order = await this.ordersRepository.findOne({_id:id});

        if(!order){
            throw Error('Order not found.')
        }

        order.isDeleted=true;
        await this.ordersRepository.update(order);

        return 'Order was deleted successfully.';

    }



    

}
