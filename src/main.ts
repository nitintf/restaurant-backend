import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  app.use(
    cookieSession({
      keys: ['asdasdvsdasvbaksvsavsd'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(4000);
}
bootstrap();
