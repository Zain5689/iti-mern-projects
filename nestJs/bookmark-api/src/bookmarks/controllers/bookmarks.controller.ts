import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookmarksService } from '../services/bookmarks.service';
import type {
  CreateBookmarkDto,
  UpdateBookmarkDto,
} from '../core/dto/bookmark.dto';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  createBookmark(@Body() dto: CreateBookmarkDto) {
    return this.bookmarksService.createBookmark(dto);
  }

  @Get()
  getallBookmarks() {
    return this.bookmarksService.getallBookmarks();
  }

  @Get(':id')
  getBookmarkById(@Param('id') id: string) {
    return this.bookmarksService.getBookmarkById(id);
  }

  @Patch(':id')
  updateBookmark(@Param('id') id: string, @Body() dto: UpdateBookmarkDto) {
    return this.bookmarksService.updateBookmark(id, dto);
  }

  @Delete(':id')
  deleteBookmark(@Param('id') id: string) {
    return this.bookmarksService.deleteBookmark(id);
  }
}
