import jwt, { type SignOptions } from 'jsonwebtoken';

export function createJWTToken(args: {
  payload: string | object;
  secret: string;
  opts?: SignOptions;
}) {
  const { payload, secret, opts } = args;

  return jwt.sign(payload, secret, opts);
}

export function verifyJWTToken<T>(args: { token: string; secret: string }): T {
  const { token, secret } = args;

  return jwt.verify(token, secret) as T;
}
