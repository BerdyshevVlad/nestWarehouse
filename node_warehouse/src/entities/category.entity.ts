import { Document } from 'mongoose';
import { BaseEntity } from './base.entity';


export class CategoryEntity extends BaseEntity  {
  name: string;
}