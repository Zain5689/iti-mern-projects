import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressBook, AddressBookDocument } from '../core/model/bookmark.model';
import { CreateBookmarkDto, UpdateBookmarkDto } from '../core/dto/bookmark.dto';

@Injectable({ scope: Scope.DEFAULT })
export class AddressBookRepository {
  constructor(
    @InjectModel(AddressBook.name)
    private readonly addressBookModel: Model<AddressBookDocument>,
  ) {}

  async getAll(): Promise<AddressBookDocument[]> {
    return await this.addressBookModel.find().exec();
  }

  async getById(id: string) {
    return await this.addressBookModel.findOne({ id }).exec();
  }

  async create(dto: CreateBookmarkDto) {
    const lastInsertedItem = await this.addressBookModel
      .findOne()
      .sort({ createdDate: -1 })
      .exec();

    const lastId = lastInsertedItem?.id ? parseInt(lastInsertedItem.id) : 0;

    return await this.addressBookModel.create({
      ...dto,
      id: String(lastId + 1),
    });
  }

  async update(id: string, dto: UpdateBookmarkDto) {
    return await this.addressBookModel
      .findOneAndUpdate({ id }, { ...dto }, { new: true })
      .exec();
  }

  async delete(id: string) {
    return await this.addressBookModel.deleteOne({ id }).exec();
  }
}
