import {PrismaClient} from '@prisma/client';

import trpcOptions from './trpcOptions';

const prismaClientSingleton = () => {
  const prisma = new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? [
            {emit: 'event', level: 'query'},
            {emit: 'stdout', level: 'error'},
            {emit: 'stdout', level: 'info'},
            {emit: 'stdout', level: 'warn'},
          ]
        : ['error'],
  });

  // `$on`イベントハンドラをここで一度だけ登録する
  if (process.env.NODE_ENV === 'development') {
    prisma.$on('query', (e) => {
      const slowQueryThreshold = 100;
      console.log(`Query: ${e.query}`);
      console.log(`🥰Params: ${e.params}`);
      console.log(`Duration: ${e.duration}ms🧐`);

      if (e.duration > slowQueryThreshold) {
        console.warn(`❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌Slow query detected: ${e.query}`);
      }
    });
  }

  return prisma;
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

export interface Context {
  prisma: PrismaClient;
}

export const createContext = () => {
  return {
    ...trpcOptions,
    prisma,
  };
};
