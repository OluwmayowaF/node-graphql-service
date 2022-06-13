import { NextFunction } from 'express';
import { auth } from 'firebase-admin';

/**
 * Auth Middleware to ensure caller has required credentials
 */

export default async (req: Request | any, res: Response | any, next: NextFunction) => {
  const bearerToken = req.headers.authorization || req.headers.Authorization;
  if (!bearerToken || !bearerToken.startsWith('Bearer')) {
    return res.status(401).send('Authorization token required');
  }
  const token = bearerToken.split(' ')[1];
  auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      next();
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).send('Unauthorized');
    });
};
