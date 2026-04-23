import { Injectable, NotFoundException } from '@nestjs/common';
import { Bookmark } from '../core/entities/bookmark.entity';
import { CreateBookmarkDto, UpdateBookmarkDto } from '../core/dto/bookmark.dto';

@Injectable()
export class BookmarksService {
  private bookmarks: Bookmark[] = [];

  getallBookmarks(): Bookmark[] {
    return this.bookmarks;
  }

  getBookmarkById(id: string): Bookmark {
    const bookmark = this.bookmarks.find((b) => b.id === id);
    if (!bookmark) throw new NotFoundException('Bookmark not found');
    return bookmark;
  }

  createBookmark(dto: CreateBookmarkDto): Bookmark {
    const newBookmark: Bookmark = {
      id: (Math.random() * 10).toFixed(0),
      ...dto,
      createdAt: new Date(),
    };
    this.bookmarks.push(newBookmark);
    return newBookmark;
  }

  updateBookmark(id: string, dto: UpdateBookmarkDto): Bookmark {
    const bookmark = this.getBookmarkById(id);
    Object.assign(bookmark, dto);
    return bookmark;
  }

  deleteBookmark(id: string): void {
    const index = this.bookmarks.findIndex((b) => b.id === id);
    if (index === -1) throw new NotFoundException('Bookmark not found');
    this.bookmarks.splice(index, 1);
  }
}
