import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';

export const redisClient = createClient({ url: process.env.REDIS_URL });
export const prisma = new PrismaClient();
