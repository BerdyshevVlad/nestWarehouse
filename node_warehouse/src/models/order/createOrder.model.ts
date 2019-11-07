import { ApiModelProperty } from '@nestjs/swagger';
export class CreateOrderModel {
    @ApiModelProperty()
    products: Array<any>;
}