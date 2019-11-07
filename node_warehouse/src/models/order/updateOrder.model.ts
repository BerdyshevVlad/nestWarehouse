import { ApiModelProperty } from '@nestjs/swagger';
export class UpdateOrderModel {
    @ApiModelProperty()
    id:string;
    @ApiModelProperty()
    products: Array<any>;
}