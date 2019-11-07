import { Repository, ObjectID } from "typeorm";
import { UserEntity } from "src/entities";
export declare class BaseMongoRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findBy: (user: Partial<UserEntity>) => Promise<UserEntity>;
    findByIds: (ids: string[] | ObjectID[]) => Promise<UserEntity[]>;
    getList: () => Promise<void>;
}
