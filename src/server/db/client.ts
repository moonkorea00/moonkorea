import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // TODO
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  if (!global.prisma) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    global.prisma = new PrismaClient();
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  prisma = global.prisma;
}

export default prisma;
