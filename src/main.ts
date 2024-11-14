declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',  // Đường dẫn sẽ là http://localhost:3000/uploads/twitter.png
  });

  // app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3000);

    
}
bootstrap();
