import { Connection, Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import Factory from '../../entities/factories';
import CategoriesModule from './categories.module';
import CategoriesService from './categories.service';
import CategoriesController from './categories.controller';
import ProductEntity from '../../entities/product/product.entity';
import CategoryEntity from '../../entities/category/category.entity';
import MemoryDatabaseProviderModule from '../../providers/db/memory/provider.module';

describe('Categories Controller', () => {
	let controller: CategoriesController;
	let service: CategoriesService;
	let repository: Repository<CategoryEntity>;
	let connection: Connection;

	let product_repository: Repository<ProductEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [MemoryDatabaseProviderModule, CategoriesModule],
		}).compile();

		controller = module.get<CategoriesController>(CategoriesController);
		service = module.get<CategoriesService>(CategoriesService);
		repository = service.repository;
		connection = module.get<Connection>(Connection);

		product_repository = connection.getRepository(ProductEntity);

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

	test("index: list categories with it's related products", async () => {
		const products = await product_repository.save(
			await Factory.factory(ProductEntity).makeMany(2),
		);

		await repository.save(
			await Factory.factory(CategoryEntity).make({
				products,
			}),
		);

		const res = await controller.index();

		expect(res).toHaveLength(1);
		expect(res[0]).toEqual(expect.any(CategoryEntity));
		expect(res[0].products).toHaveLength(2);
	});

	test("index: should list categories with it's related products", async () => {
		const products = await product_repository.save(
			await Factory.factory(ProductEntity).makeMany(2),
		);

		await repository.save(
			await Factory.factory(CategoryEntity).make({
				products,
			}),
		);

		const res = await controller.index();

		expect(res).toHaveLength(1);
		expect(res[0]).toEqual(expect.any(CategoryEntity));
		expect(res[0].products).toHaveLength(2);
	});

	test('index: should filter archived categories', async () => {
		await repository.save(
			await Factory.factory(CategoryEntity).makeMany(2),
		);

		await repository.save(
			await Factory.factory(CategoryEntity).makeMany(2, {
				deleted_at: new Date(),
			}),
		);

		await expect(controller.index()).resolves.toHaveLength(2);
	});

	test('create: should create a new category', async () => {
		const data = await Factory.factory(CategoryEntity).make();

		await expect(controller.create(data)).resolves.toEqual(
			expect.any(CategoryEntity),
		);
	});

	test('create: should throw "BadRequest" if slug already exists', async () => {
		const { slug } = await repository.save(
			await Factory.factory(CategoryEntity).make(),
		);

		const data = await Factory.factory(CategoryEntity).make({ slug });

		await expect(controller.create(data)).rejects.toThrowError(
			BadRequestException,
		);
	});

	test('show: should fetch a category', async () => {
		const { id } = await repository.save(
			await Factory.factory(CategoryEntity).make(),
		);

		await expect(controller.show(id)).resolves.toEqual(
			expect.any(CategoryEntity),
		);
	});

	test('show: should throw "NotFound" if category doesnt exists', async () => {
		await expect(controller.show(0)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('update: should update a category', async () => {
		const { id } = await repository.save(
			await Factory.factory(CategoryEntity).make(),
		);

		const data = await Factory.factory(CategoryEntity).make();

		await expect(controller.update(id, data)).resolves.toEqual(
			expect.any(CategoryEntity),
		);
	});

	test('update: should throw "NotFound" if category doesnt exists', async () => {
		const data = await Factory.factory(CategoryEntity).make();

		await expect(controller.update(0, data)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('update: should throw "BadRequest" if slug already exists', async () => {
		const { slug } = await repository.save(
			await Factory.factory(CategoryEntity).make(),
		);

		const { id } = await repository.save(
			await Factory.factory(CategoryEntity).make(),
		);

		const data = await Factory.factory(CategoryEntity).make({ slug });

		await expect(controller.update(id, data)).rejects.toThrowError(
			BadRequestException,
		);
	});

	test('remove: should archive a category', async () => {
		const { id } = await repository.save(
			await Factory.factory(CategoryEntity).make(),
		);

		await controller.remove(id);

		await expect(controller.show(id)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('remove: should throw "NotFound" if category doesnt exists', async () => {
		await expect(controller.remove(0)).rejects.toThrowError(
			NotFoundException,
		);
	});
});
