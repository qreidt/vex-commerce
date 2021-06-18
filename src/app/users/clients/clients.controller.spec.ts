import { Connection } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import ClientsModule from './clients.module';
import ClientsService from './clients.service';
import Factory from '../../../entities/factories';
import ClientsController from './clients.controller';
import UserEntity from '../../../entities/user/user.entity';
import MemoryDatabaseProviderModule from '../../../providers/db/memory/provider.module';

describe('Clients Controller', () => {
	let controller: ClientsController;
	let service: ClientsService;
	let connection: Connection;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [MemoryDatabaseProviderModule, ClientsModule],
		}).compile();

		controller = module.get<ClientsController>(ClientsController);
		service = module.get<ClientsService>(ClientsService);

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

	test('index: should get a list only of clients', async () => {
		// create administrators list
		await service.repository.save(
			await Factory.factory(UserEntity).makeMany(5, {
				type: UserEntity.TYPES.administrator,
			}),
		);

		// create clients list
		await service.repository.save(
			await Factory.factory(UserEntity).makeMany(5, {
				type: UserEntity.TYPES.client,
			}),
		);

		await expect(controller.index()).resolves.toHaveLength(5);
	});

	test('show: should fetch a client', async () => {
		const { id } = await service.repository.save(
			await Factory.factory(UserEntity).make({
				type: UserEntity.TYPES.client,
			}),
		);

		await expect(controller.show(id)).resolves.toEqual(
			expect.any(UserEntity),
		);
	});

	test('show: should not fetch an administrator', async () => {
		const { id } = await service.repository.save(
			await Factory.factory(UserEntity).make({
				type: UserEntity.TYPES.administrator,
			}),
		);

		await expect(controller.show(id)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('show: should throw "NotFoundException" if user doesn\'t exist', async () => {
		await expect(controller.show(0)).rejects.toThrowError(
			NotFoundException,
		);
	});
});
