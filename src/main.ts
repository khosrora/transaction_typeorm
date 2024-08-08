import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () =>
    console.log(`app is running on port http://localhost:${PORT}`),
  );
}
bootstrap();
