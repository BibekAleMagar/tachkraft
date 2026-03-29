import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

let isInitialized = false;

async function initializeApp() {
  if (!isInitialized) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );

    app.enableCors({
      origin: '*', // change this to your frontend URL in production
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    // If you use a global prefix in main.ts, add it here too
    // app.setGlobalPrefix('api');

    await app.init();
    isInitialized = true;
  }
}

export default async function handler(req: any, res: any) {
  await initializeApp();
  server(req, res);
}