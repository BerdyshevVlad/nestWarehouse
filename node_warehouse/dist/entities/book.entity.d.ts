import { Document } from 'mongoose';
export declare class BookEntity extends Document {
    id: number;
    price: number;
    categoryId: number;
    name: string;
    isActive: boolean;
}
