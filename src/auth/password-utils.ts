import bcrypt from 'bcryptjs';
//import { env } from '@/env.mjs';

const pepper = '1234567890ab' // TODO: get from env

export async function hashPassword(password: string) {
  //const pepper = process.env.PASSWORD_PEPPER;
  return bcrypt.hash(password + pepper, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  //const pepper = env.PASSWORD_PEPPER;
  return bcrypt.compare(password + pepper, hashedPassword);
}
