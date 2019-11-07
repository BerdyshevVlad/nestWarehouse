import { BaseEntity } from './base.entity';


export class OrderEntity extends BaseEntity  {
  totalPrice:number;
  totalAmount:number;
  products: Array<ProductDetails>;

  constructor(){
    super();
    this.products = new Array<ProductDetails>();
    this.totalPrice=0;
    this.totalAmount=0;
  }
}

export class ProductDetails{
    amount: number;
    product: any;
}