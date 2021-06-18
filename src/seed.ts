// noinspection JSIgnoredPromiseFromCall

import { NestFactory } from '@nestjs/core';
import SeederModule from './db/seeders/seeder.module';
import UserSeederService from './db/seeders/users/user.service';

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(SeederModule);

	const seeder = app.get<UserSeederService>(UserSeederService);
	await seeder.run();

	await app.close();
}

bootstrap();
