import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenAuthModel, SignUpAuthModel } from 'src/models';
import { SignInAuthModel } from 'src/models/auth/signIn.model';
import { UserEntity, UserRole } from 'src/entities/user.entity';
import { UserModel } from '../models'
import { Md5 } from 'ts-md5/dist/md5';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BookEntity } from 'src/entities/book.entity';
import { CreateBookModel } from 'src/models/book/createBook.model';
import { UpdateBookModel } from 'src/models/book/updateBook.model';
import { GetBookModel } from 'src/models/book/getBook.model';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel('BookEntity') private readonly booksRepository: Model<BookEntity>
    ) {}

    async get(id: string):Promise<GetBookModel>{
        const book = await this.booksRepository.findOne({_id:id});
        if(!book){
            throw Error('Book not found.')
        }

        let model = new GetBookModel();
        model.id=book._id;
        model.name=book.name;
        model.price=book.price;
        model.categoryId=book.categoryId;

        return model;
    }

    async getAll():Promise<GetBookModel[]>{
        let books = await this.booksRepository.find().exec();
        if(!books){
            throw Error('Books not found.')
        }

        let model = new Array<GetBookModel>();

        books.forEach(book => 
            {
                let bookModel = new GetBookModel();
                bookModel.id=book._id;
                bookModel.name=book.name;
                bookModel.price=book.price;
                bookModel.categoryId=book.categoryId;
                model.push(bookModel);
            });

        return model;
    }

   async create(model:CreateBookModel){
        let book = new BookEntity();
        book.categoryId=model.categoryId;
        book.isActive=true;
        book.name=model.name;
        book.price=model.price;

        const newBook = this.booksRepository.create(book);

        return 'Book was created successfully.';
   }

   async delete(id:string){
       const book = await this.booksRepository.findOne({_id:id});

       if(!book){
        throw Error('Book not found.');
       }

       book.isDeleted=true;
       await this.booksRepository.update(book);

       return 'Book was deleted successfully.';
   }

   async update(model: UpdateBookModel){
    const book = await this.booksRepository.findOne({_id:model.id});
    if(!book){
        throw Error('Book not found.');
       }

    book.categoryId=model.categoryId;
    book.name=model.name;
    book.price=model.price;

    await this.booksRepository.updateOne(book);

    return 'Book was updated successfully.'
   }


}
