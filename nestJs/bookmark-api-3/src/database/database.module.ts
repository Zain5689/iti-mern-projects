import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { getMongoConnection } from './providers/mongo-connection.provider';
import { Connection, Schema } from 'mongoose';

export type MongoModelMetaDefinition = {
  modelName: string;
  schema: Schema;
};

export type DatabaseModuleRootAsyncDelegatedProvider = {
  imports?: any;
  useFactory?: (...args: any[]) => Promise<string> | string;
  inject?: any[];
};

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(params: { connectionString: string }): DynamicModule {
    const { connectionString } = params;

    const connectionProvider: Provider = {
      provide: 'MONGO_CONNECTION',
      useFactory: async () => {
        if (!connectionString) {
          throw new Error('MONGO_URL is not defined');
        }
        return await getMongoConnection(connectionString);
      },
      inject: [],
    };

    return {
      module: DatabaseModule,
      imports: [],
      providers: [connectionProvider],
      exports: [connectionProvider],
    };
  }

  static forRootAsync(
    params: DatabaseModuleRootAsyncDelegatedProvider,
  ): DynamicModule {
    const providers: Provider[] = [
      {
        provide: 'MONGO_CONNECTION',
        useFactory: async (
          ...nestInjectorDependenciesResponse: any[]
        ): Promise<Connection> => {
          const uri = await (params?.useFactory?.(
            ...nestInjectorDependenciesResponse,
          ) as string | Promise<string>);
          if (!uri) {
            throw new Error('MONGO_URI is not defined');
          }
          const connection = await getMongoConnection(uri);
          return connection;
        },
        inject: [...(params?.inject as any[])],
      },
    ];

    return {
      module: DatabaseModule,
      imports: [...(params?.imports || [])],
      providers: [...providers],
      exports: [...providers],
    };
  }

  static forFeature(params: {
    mongoModelMetaDefinitions: MongoModelMetaDefinition[];
  }): DynamicModule {
    const { mongoModelMetaDefinitions } = params;

    // provider
    const mongoModelProviders: Provider[] = mongoModelMetaDefinitions.map(
      ({ modelName, schema }) => {
        const dependencyToken: string = `${modelName.toUpperCase()}_MODEL`;
        return {
          provide: dependencyToken,
          useFactory: (connection: Connection) => {
            return connection.model(modelName, schema);
          },
          inject: ['MONGO_CONNECTION'],
        };
      },
    );

    return {
      module: DatabaseModule,
      providers: [...mongoModelProviders],
      exports: [...mongoModelProviders],
    };
  }
}
