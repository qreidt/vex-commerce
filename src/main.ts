// noinspection JSIgnoredPromiseFromCall

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import AppConfigService from './config/app/config.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());

	const app_config: AppConfigService = app.get('AppConfigService');

	await app.listen(app_config.PORT);
}

bootstrap();
