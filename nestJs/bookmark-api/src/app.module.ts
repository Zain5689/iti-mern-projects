import { Module } from '@nestjs/common';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [BookmarksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
