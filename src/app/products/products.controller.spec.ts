import { Connection, Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import Factory from '../../entities/factories';
import ProductsModule from './products.module';
import ProductsService from './products.service';
import ProductsController from './products.controller';
import ProductEntity from '../../entities/product/product.entity';
import MemoryDatabaseProviderModule from '../../providers/db/memory/provider.module';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('Products Controller', () => {
	let controller: ProductsController;
	let service: ProductsService;
	let repository: Repository<ProductEntity>;
	let connection: Connection;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [MemoryDatabaseProviderModule, ProductsModule],
		}).compile();

		controller = module.get<ProductsController>(ProductsController);
		service = module.get<ProductsService>(ProductsService);
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

	test('index: should get a list of products', async () => {
		await repository.save(await Factory.factory(ProductEntity).makeMany(5));

		await expect(controller.index()).resolves.toHaveLength(5);
	});

	test('index: should filter archived products', async () => {
		await repository.save(await Factory.factory(ProductEntity).makeMany(5));
		await repository.save(
			await Factory.factory(ProductEntity).makeMany(3, {
				deleted_at: new Date(),
			}),
		);

		await expect(controller.index()).resolves.toHaveLength(5);
	});

	test('create: should create a new product', async () => {
		const product = await Factory.factory(ProductEntity).make();
		await expect(controller.create(product)).resolves.toEqual(
			expect.any(ProductEntity),
		);
	});

	test('create: should throw "BadRequest" if the slug already exists', async () => {
		const product = await Factory.factory(ProductEntity).make();
		await repository.save(
			await Factory.factory(ProductEntity).make({
				slug: product.slug,
			}),
		);

		await expect(controller.create(product)).rejects.toThrowError(
			BadRequestException,
		);
	});

	test('show: should fetch a product', async () => {
		const { id } = await repository.save(
			await Factory.factory(ProductEntity).make(),
		);
		await expect(controller.show(id)).resolves.toEqual(
			expect.any(ProductEntity),
		);
	});

	test('show: throw "NotFound" if the product doesnt exist', async () => {
		await expect(controller.show(0)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('update: should update a product', async () => {
		const { id } = await repository.save(
			await Factory.factory(ProductEntity).make(),
		);

		const product = await Factory.factory(ProductEntity).make();

		await expect(controller.update(id, product)).resolves.toEqual(
			expect.any(ProductEntity),
		);
	});

	test('update: should throw "BadRequest" if the new slug already exists', async () => {
		const { slug } = await repository.save(
			await Factory.factory(ProductEntity).make(),
		);

		const { id } = await repository.save(
			await Factory.factory(ProductEntity).make(),
		);

		const product = await Factory.factory(ProductEntity).make({ slug });

		await expect(controller.update(id, product)).rejects.toThrowError(
			BadRequestException,
		);
	});

	test('update: throw "NotFound" if the product doesnt exist', async () => {
		await expect(controller.show(0)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('archive: should archive a product', async () => {
		const { id } = await repository.save(
			await Factory.factory(ProductEntity).make(),
		);

		await controller.remove(id);

		await expect(controller.show(id)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('archive: throw "NotFound" if the product doesnt exist', async () => {
		await expect(controller.remove(0)).rejects.toThrowError(
			NotFoundException,
		);
	});
});
