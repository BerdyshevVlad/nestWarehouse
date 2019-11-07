import { Document } from 'mongoose';
import { BaseEntity } from './base.entity';


export class BookEntity extends BaseEntity  {
  price: number;
  categoryId: string;
  name: string;
}
