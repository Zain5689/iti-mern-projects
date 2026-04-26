import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarksController } from './controllers/bookmarks.controller';
import { BookmarksService } from './services/bookmarks.service';
import { AddressBookSchema } from './core/model/bookmark.model';
import { AddressBookRepository } from './repositories/bookmark.repositroy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AddressBook', schema: AddressBookSchema },
    ]),
  ],
  controllers: [BookmarksController],
  providers: [AddressBookRepository, BookmarksService],
})
export class AddressBookModule {}
