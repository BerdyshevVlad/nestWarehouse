import { UserRole, UserEntity } from "src/entities/user.entity";
import { ApiModelProperty } from "@nestjs/swagger";

export class UserModel {
    constructor(entity: UserEntity) {
        this.id=entity._id.toString();
        this.email = entity.email;
        this.firstName = entity.firstName;
        this.lastName = entity.lastName;
        this.role=entity.role;
    }
    @ApiModelProperty()
    id: string;

    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    firstName: string;

    @ApiModelProperty()
    lastName: string;

    @ApiModelProperty()
    role: UserRole
}