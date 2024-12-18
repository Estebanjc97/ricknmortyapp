import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly firebaseService: FirebaseService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decodedToken = await this.firebaseService.verifyIdToken(token);
      req['user'] = decodedToken;
      next();
    } catch (error) {
      return res
        .status(403)
        .json({ message: 'Unauthorized', error: error.message });
    }
  }
}
