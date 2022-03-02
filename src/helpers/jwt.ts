import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({});

export const signJwt = (
  object: Record<string, string>,
  options?: jwt.SignOptions | undefined,
) => {
  const key = process.env.ACCESS_TOKEN_PRIVATE_KEY as string;
  const signingKey = Buffer.from(key, 'base64').toString('ascii');

  try {
    return jwt.sign(object, signingKey, {
      ...(options && options),
      algorithm: 'RS256',
    });
  } catch (err) {
    return console.log('err', err);
  }
};

export function verifyJwt<T>(token: string): T | null {
  const key: string = process.env.ACCESS_TOKEN_PUBLIC_KEY as string;
  const publicKey = Buffer.from(key as string, 'base64').toString('ascii');

  try {
    const { userId } = jwt.verify(token, publicKey) as { userId: T };
    return userId;
  } catch (err) {
    console.log('err', err);
    return null;
  }
}
