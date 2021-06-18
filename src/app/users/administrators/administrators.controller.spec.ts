import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import MemoryDatabaseProviderModule from '../../../providers/db/memory/provider.module';
import { AdministratorsModule } from './administrators.module';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';

describe('Administrators Controller', () => {
	let controller: AdministratorsController;
	let service: AdministratorsService;
	let connection: Connection;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [MemoryDatabaseProviderModule, AdministratorsModule],
		}).compile();

		controller = module.get<AdministratorsController>(AdministratorsController);

		service = module.get<AdministratorsService>(AdministratorsService);

		connection = module.get<Connection>(Connection);
		await connection.close();
	});

	beforeEach(async () => {
		await connection.connect();
	});

	afterEach(async () => {
		await connection.close();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
