import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import AppController from '../src/app.controller';
import AppConfigModule from '../src/config/config.module';
import MySQLDatabaseProviderModule from '../src/providers/db/mysql/provider.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppConfigModule, MySQLDatabaseProviderModule],
			controllers: [AppController],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('(GET) /', () => {
		return request(app.getHttpServer()).get('/').expect(200);
	});
});
