import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    passwordHash: String,
    emailConfirmed: Boolean,
    creationDate:Date,
    isActive: Boolean,
    isDeleted: Boolean,
    role: String
  });
  
  export const BookSchema = new mongoose.Schema({
    price: Number,
    categoryId: String,
    name: String,
    creationDate:Date,
    isActive: Boolean,
    isDeleted: Boolean
  });
  
  export const OrderSchema = new mongoose.Schema({
    totalPrice:Number,
    totalAmount:Number,
    products: Array<any[]>(),
    creationDate:Date,
    isActive: Boolean,
    isDeleted: Boolean
  });