import { ApiModelProperty } from '@nestjs/swagger';
export class GetBookModel {
    @ApiModelProperty()
    id: string;
    @ApiModelProperty()
    name: string;
    @ApiModelProperty()
    price: number;
    @ApiModelProperty()
    categoryId: string;
}