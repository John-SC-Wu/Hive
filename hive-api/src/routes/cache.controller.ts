import { Request, Response, NextFunction, Router } from "express";
import Redis from 'ioredis';

// --- create a Redis client ---
const redis = new Redis(); // equivalent to below
// const redis = new Redis(6379, "127.0.0.1"); // 127.0.0.1:6379

export class CacheController {
  public router = Router();
  constructor() {
    this.router.route('/').get(this.checkCache, this.cachedRoute);
  }

  // --- Route Handler ---
  private cachedRoute = async (req: Request, res: Response) => {
    const dataToCache = { message: 'Data to be cached' };
    await redis.set('cachedData', JSON.stringify(dataToCache), 'EX', 5); // Cache for 5 sec.
    res.send(dataToCache);
  }

  // --- Middleware to check if data is in the cache ---
  private async checkCache(req: Request, res: Response, next: NextFunction) {
    const cachedData = await redis.get('cachedData');

    if (cachedData) {
      res.send(JSON.parse(cachedData));
    } else {
      next(); // Continue to the route handler if data is not in the cache
    }
  };
}