import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Repository } from 'typeorm';
import VariantsModule from './variants.module';
import VariantsService from './variants.service';
import VariantsController from './variants.controller';
import VariantEntity from '../../entities/variant/variant.entity';
import MemoryDatabaseProviderModule from '../../providers/db/memory/provider.module';

describe('Variants Controller', () => {
	let controller: VariantsController;
	let service: VariantsService;
	let repository: Repository<VariantEntity>;
	let connection: Connection;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [MemoryDatabaseProviderModule, VariantsModule],
		}).compile();

		controller = module.get<VariantsController>(VariantsController);
		service = module.get<VariantsService>(VariantsService);
		repository = service.repository;
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
