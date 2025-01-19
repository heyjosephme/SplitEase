// src/server/auth/auth.service.ts
import { hashPassword, verifyPassword } from '@/auth/password-utils';
import  prisma  from '@/lib/prisma';
import type { User } from '@prisma/client';

export async function createUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password);
  
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    }
  });
}

export async function verifyUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  });
  
  if (!user) return null;
  
  const isValid = await verifyPassword(password, user.password);
  return isValid ? user : null;
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email }
  });
}
