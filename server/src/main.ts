import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import fs from 'fs';

async function bootstrap() {
  const devOption = process.env.NODE_ENV;

  let app;

  if (devOption === 'production') {
    const httpsOptions = {
      key: fs.readFileSync('/etc/letsencrypt/live/mixlands.space/privkey.pem'),
      cert: fs.readFileSync(
        '/etc/letsencrypt/live/mixlands.space/fullchain.pem',
      ),
    };

    app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
  } else {
    app = await NestFactory.create(AppModule);
  }

  const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  await app.listen(process.env.PORT, () =>
    console.log(`Server started on port: ${process.env.PORT}`),
  );
}
bootstrap();
