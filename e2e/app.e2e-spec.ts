import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import AppController from '../src/app.controller';
import MySQLDatabaseProviderModule from '../src/providers/database/mysql/provider.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [MySQLDatabaseProviderModule],
			controllers: [AppController],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('(GET) /', () => {
		return request(app.getHttpServer()).get('/').expect(200);
	});
});
