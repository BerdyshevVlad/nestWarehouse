import { Document } from 'mongoose';

export abstract class BaseEntity{
    _id: string;
    creationDate:Date;
    isActive: boolean;
    isDeleted: boolean;

    constructor(){
        this.creationDate = new Date();
        this.isDeleted=false;
    }
}