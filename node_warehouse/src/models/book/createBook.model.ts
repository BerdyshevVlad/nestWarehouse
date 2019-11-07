import { ApiModelProperty } from '@nestjs/swagger';
export class CreateBookModel {
    @ApiModelProperty()
    name: string;
    @ApiModelProperty()
    price: number;
    @ApiModelProperty()
    categoryId: string;
}