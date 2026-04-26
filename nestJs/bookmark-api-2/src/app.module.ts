import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AddressBookModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // src/app.module.ts
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>('MONGO_URL');
        if (!url) {
          throw new Error('MONGO_URL is missing from .env');
        }
        return url;
      },
    }),
    AddressBookModule,
  ],
})
export class AppModule {}
