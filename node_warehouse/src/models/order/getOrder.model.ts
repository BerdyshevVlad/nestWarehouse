import { ApiModelProperty } from '@nestjs/swagger';
export class GetOrderModel {
    @ApiModelProperty()
    id:string;
    @ApiModelProperty()
    totalPrice:number;
    @ApiModelProperty()
    totalAmount:number;
    @ApiModelProperty()
    products: Array<any>;

    constructor() {
        this.products = new Array<any>();
    }
}