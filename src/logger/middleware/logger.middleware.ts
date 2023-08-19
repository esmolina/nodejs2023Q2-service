import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request data from middleware:`, {
      headers: req.headers,
      body: req.body,
      originalUrl: req.originalUrl,
    });

    if (next) {
      next();
    }
  }
}
