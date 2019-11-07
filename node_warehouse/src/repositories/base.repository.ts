import { Repository, ObjectID } from "typeorm";
import { UserEntity } from "src/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "src/entities/book.entity";
import { Injectable } from "@nestjs/common";

export class BaseMongoRepository {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {
    }

    findBy = async (user: Partial<UserEntity>) => {
        const result = await this.userRepository.findOne(user)
        return result;
    }

    findByIds = async (ids: string[] | ObjectID[]) => {
        const result = await this.userRepository.findByIds(ids)
        return result;
    }

    getList = async () => {
        
    }
}