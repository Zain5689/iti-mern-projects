import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AddressBookSchema } from './core/model/bookmark.model';
import { BookmarksController } from './controllers/bookmarks.controller';
import { AddressBookRepository } from './repositories/bookmark.repositroy';
import { BookmarksService } from './services/bookmarks.service';

@Module({
  imports: [
    DatabaseModule.forFeature({
      mongoModelMetaDefinitions: [
        {
          modelName: 'AddressBook',
          schema: AddressBookSchema,
        },
      ],
    }),
  ],
  controllers: [BookmarksController],
  providers: [AddressBookRepository, BookmarksService],
})
export class AddressBookModule {}
