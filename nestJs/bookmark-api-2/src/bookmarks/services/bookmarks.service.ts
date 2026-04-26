import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookmarkDto, UpdateBookmarkDto } from '../core/dto/bookmark.dto';
import { AddressBook } from '../core/model/bookmark.model';
import { AddressBookRepository } from '../repositories/bookmark.repositroy';

@Injectable()
export class BookmarksService {
  constructor(private readonly repository: AddressBookRepository) {}

  async getallBookmarks(): Promise<AddressBook[]> {
    return await this.repository.getAll();
  }

  async getBookmarkById(id: string): Promise<AddressBook> {
    const bookmark = await this.repository.getById(id);
    if (!bookmark) throw new NotFoundException('Bookmark not found');
    return bookmark;
  }

  async createBookmark(dto: CreateBookmarkDto): Promise<AddressBook> {
    return await this.repository.create(dto);
  }

  async updateBookmark(
    id: string,
    dto: UpdateBookmarkDto,
  ): Promise<AddressBook> {
    const bookmark = await this.repository.update(id, dto);
    if (!bookmark) throw new NotFoundException('Bookmark not found');
    return bookmark;
  }

  async deleteBookmark(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.deletedCount === 0)
      throw new NotFoundException('Bookmark not found');
  }
}
