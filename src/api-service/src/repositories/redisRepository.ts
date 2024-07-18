import { createClient } from 'redis';
import { promisify } from 'util';
import { config } from '../Config';
export class RedisRepository {
  private client;
  private getAsync: (key: string) => Promise<string | null>;

  private constructor(
    client: any, 
    getAsync: (key: string) => Promise<string | null>) {
    this.client = client;
    this.getAsync = getAsync;
  }

  static async create() {
    const redisUrl = config.redisUrl;
    const client = createClient({ url: redisUrl, legacyMode: true });
    client.connect();
    const getAsync = promisify(client.get).bind(client);
    const setAsync = promisify(client.set).bind(client);

    client.on('error', (err) => {
      console.error(`Redis error: ${err}`);
    });

    client.on('end', () => {
      console.log('Client disconnected from Redis');
    });

    return new RedisRepository(client, getAsync);
  }

  async readByKey(key: string): Promise<string | null> {
    if (!this.client || !this.client.isOpen) {
      return Promise.reject(new Error('The client is closed'));
    }
    
    try {
      const value = await this.getAsync(key);
      return value;
    } catch (error) {
      console.error(`Error reading key ${key} from Redis: ${error}`);
      return null;
    }
  }
}
