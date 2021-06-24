// noinspection JSIgnoredPromiseFromCall

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import AppConfigService from './config/config.service';
import UserSeederService from './db/seeders/users/user.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	const app_config = app.get<AppConfigService>(AppConfigService);

	const seeder = app.get<UserSeederService>(UserSeederService);
	await seeder.run();

	await app.listen(app_config.port);
}

bootstrap();
