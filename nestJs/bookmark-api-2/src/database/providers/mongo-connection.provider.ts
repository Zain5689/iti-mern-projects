import { Connection, createConnection } from 'mongoose';

export async function getMongoConnection(
  connectionUrl?: string,
): Promise<Connection> {
  const fallbackUrl = 'mongodb://127.0.0.1:27017/bookmark-api-2';
  const finalUrl = connectionUrl || fallbackUrl;

  return new Promise((resolve, reject) => {
    try {
      console.log(`Attempting to connect to: ${finalUrl}`);

      const connection = createConnection(finalUrl);

      connection.on('connecting', () => {
        console.log('Connecting to MongoDB...');
      });

      connection.on('connected', () => {
        console.log('Connected successfully to MongoDB');
        resolve(connection);
      });

      connection.on('reconnecting', () => {
        console.log('Reconnecting to MongoDB...');
      });

      connection.on('error', (error: Error) => {
        console.error('MongoDB Connection Error:', error.message);
        reject(error);
      });

      connection.on('disconnected', () => {
        console.warn(' MongoDB disconnected');
      });
    } catch (error) {
      console.error('Unexpected error during connection setup:', error);
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
}
