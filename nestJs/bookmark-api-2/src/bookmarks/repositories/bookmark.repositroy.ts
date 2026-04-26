import { Inject, Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { AddressBook, AddressBookDocument } from '../core/model/bookmark.model';

type CreateAddressBookPayload = Omit<AddressBook, 'id'>;
type UpdateAddressBookPayload = Partial<
  Omit<AddressBook, 'id' | 'createdDate'>
>;

@Injectable({ scope: Scope.DEFAULT })
export class AddressBookRepository {
  constructor(
    @Inject('ADDRESSBOOK_MODEL')
    private readonly addressBookModel: Model<AddressBookDocument>,
  ) {}

  async getAll(): Promise<AddressBookDocument[]> {
    return await this.addressBookModel.find().exec();
  }

  async getById(id: string) {
    return await this.addressBookModel.findOne({ id }).exec();
  }

  async create(dto: CreateAddressBookPayload) {
    const lastInsertedItem = await this.addressBookModel
      .findOne()
      .sort({ createdDate: -1 })
      .exec();

    const lastId = lastInsertedItem?.id ? parseInt(lastInsertedItem.id) : 0;
    const nextIndx = lastId + 1;

    return await this.addressBookModel.create({
      ...dto,
      id: String(nextIndx),
    });
  }

  async update(id: string, dto: UpdateAddressBookPayload) {
    return await this.addressBookModel
      .findOneAndUpdate({ id }, { ...dto }, { new: true })
      .exec();
  }

  async delete(id: string) {
    return await this.addressBookModel.deleteOne({ id }).exec();
  }
}
