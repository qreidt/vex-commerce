import { Connection, Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import Factory from '../../../entities/factories';
import ProductVariantsModule from './product_variants.module';
import ProductVariantsService from './product_variants.service';
import ProductVariantsController from './product_variants.controller';
import VariantEntity from '../../../entities/product_variant/product_variant.entity';
import ProductEntity from '../../../entities/product/product.entity';
import MemoryDatabaseProviderModule from '../../../providers/db/memory/provider.module';

describe('Variants Controller', () => {
	let controller: ProductVariantsController;
	let service: ProductVariantsService;
	let repository: Repository<VariantEntity>;
	let product_repository: Repository<ProductEntity>;
	let connection: Connection;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [MemoryDatabaseProviderModule, ProductVariantsModule],
		}).compile();

		controller = module.get<ProductVariantsController>(
			ProductVariantsController,
		);
		service = module.get<ProductVariantsService>(ProductVariantsService);
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

	test('index: should get a list of variants', async () => {
		// create products
		const products = await product_repository.save(
			await Factory.factory(ProductEntity).makeMany(2),
		);

		// create variants for products
		for (const product of products) {
			await repository.save(
				await Factory.factory(VariantEntity, { product }).makeMany(5),
			);
		}

		await expect(controller.index()).resolves.toHaveLength(10);
	});

	test('index: should filter archived variants', async () => {
		const product = await product_repository.save(
			await Factory.factory(ProductEntity).make(),
		);

		await repository.save(
			await Factory.factory(VariantEntity, { product }).makeMany(5),
		);

		await repository.save(
			await Factory.factory(VariantEntity, { product }).makeMany(3, {
				deleted_at: new Date(),
			}),
		);

		await expect(controller.index()).resolves.toHaveLength(5);
	});

	test('create: should create a new product_variant', async () => {
		const product = await product_repository.save(
			await Factory.factory(ProductEntity).make(),
		);

		const variant = await Factory.factory(VariantEntity, {
			product,
		}).make();

		await expect(controller.create(variant)).resolves.toEqual(
			expect.any(VariantEntity),
		);
	});

	test('show: should fetch a product_variant', async () => {
		const product = await product_repository.save(
			await Factory.factory(ProductEntity).make(),
		);

		const { id } = await repository.save(
			await Factory.factory(VariantEntity, { product }).make(),
		);

		await expect(controller.show(id)).resolves.toEqual(
			expect.any(VariantEntity),
		);
	});

	test('show: throw "NotFound" if the product_variant doesnt exist', async () => {
		await expect(controller.show(0)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('update: should update a product_variant', async () => {
		const product = await product_repository.save(
			await Factory.factory(ProductEntity).make(),
		);

		const { id } = await repository.save(
			await Factory.factory(VariantEntity, { product }).make(),
		);

		const variant = await Factory.factory(VariantEntity, {
			product,
		}).make();

		await expect(controller.update(id, variant)).resolves.toEqual(
			expect.any(VariantEntity),
		);
	});

	test('update: throw "NotFound" if the product_variant doesnt exist', async () => {
		await expect(controller.show(0)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('archive: should archive a product_variant', async () => {
		const product = await product_repository.save(
			await Factory.factory(ProductEntity).make(),
		);

		const { id } = await repository.save(
			await Factory.factory(VariantEntity, { product }).make(),
		);

		await controller.remove(id);

		await expect(controller.show(id)).rejects.toThrowError(
			NotFoundException,
		);
	});

	test('archive: throw "NotFound" if the product_variant doesnt exist', async () => {
		await expect(controller.remove(0)).rejects.toThrowError(
			NotFoundException,
		);
	});
});
