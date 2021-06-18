import { Connection } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import Factory from '../../../entities/factories';
import UserEntity from '../../../entities/user/user.entity';
import AdministratorsModule from './administrators.module';
import AdministratorsService from './administrators.service';
import AdministratorsController from './administrators.controller';
import CreateAdministratorDto from './dto/create-administrator.dto';
import UpdateAdministratorDto from './dto/update-administrator.dto';
import MemoryDatabaseProviderModule from '../../../providers/db/memory/provider.module';

describe('Administrators Controller', () => {
	let controller: AdministratorsController;
	let service: AdministratorsService;
	let connection: Connection;

	const create_dto: CreateAdministratorDto = {
		name: 'Test User',
		email: 'email@example.com',
		password: 'password',
	};

	const update_dto: UpdateAdministratorDto = {
		name: 'Test User',
		email: 'email@example.com',
	};

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [MemoryDatabaseProviderModule, AdministratorsModule],
		}).compile();

		controller = module.get<AdministratorsController>(
			AdministratorsController,
		);
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

	test('index: should get a list only of administrators', async () => {
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

	test('create: should create a new administrator', async () => {
		const user = await Factory.factory(UserEntity).make();

		await expect(controller.create(user)).resolves.toEqual(
			expect.any(UserEntity),
		);
	});

	test('create: should create a new administrator', async () => {
		const user = await Factory.factory(UserEntity).make();

		await expect(controller.create(user)).resolves.toEqual(
			expect.any(UserEntity),
		);
	});

	test('create: should fail if e-mail already exists', async () => {
		await service.create(create_dto);
		const user = await Factory.factory(UserEntity).make({
			email: create_dto.email,
		});

		await expect(controller.create(user)).rejects.toThrowError(
			BadRequestException,
		);
	});

	test('show: should fetch an administrator', async () => {
		const { id } = await service.repository.save(
			await Factory.factory(UserEntity).make({
				type: UserEntity.TYPES.administrator,
			}),
		);

		await expect(controller.show(id)).resolves.toEqual(
			expect.any(UserEntity),
		);
	});

	test('show: should not fetch a client', async () => {
		const { id } = await service.repository.save(
			await Factory.factory(UserEntity).make({
				type: UserEntity.TYPES.client,
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

	test('update: should update an administrator', async () => {
		const { id } = await service.repository.save(
			await Factory.factory(UserEntity).make({
				type: UserEntity.TYPES.administrator,
			}),
		);

		await expect(controller.update(id, update_dto)).resolves.toEqual(
			expect.any(UserEntity),
		);
	});

	test('update: should not update an client', async () => {
		const { id } = await service.repository.save(
			await Factory.factory(UserEntity).make({
				type: UserEntity.TYPES.client,
			}),
		);

		await expect(controller.update(id, update_dto)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('update: should throw "NotFoundException" if user doesn\'t exist', async () => {
		await expect(controller.update(0, update_dto)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('delete: should delete an administrator', async () => {
		const { id } = await service.repository.save(
			await Factory.factory(UserEntity).make({
				type: UserEntity.TYPES.administrator,
			}),
		);

		await controller.remove(id);

		await expect(controller.show(id)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('delete: should not delete an client', async () => {
		const { id } = await service.repository.save(
			await Factory.factory(UserEntity).make({
				type: UserEntity.TYPES.client,
			}),
		);

		await expect(controller.remove(id)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('delete: should throw "NotFoundException" if user doesn\'t exist', async () => {
		await expect(controller.remove(0)).rejects.toThrowError(
			NotFoundException,
		);
	});
});
