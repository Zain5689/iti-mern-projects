import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressBookModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>('MONGO_URL');
        if (!url) {
          throw new Error('MONGO_URL is missing from .env');
        }
        return {
          uri: url,
        };
      },
    }),

    AddressBookModule,
  ],
})
export class AppModule {}
