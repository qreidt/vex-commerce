import { Not, Repository } from 'typeorm';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import ProductEntity from '../../entities/product/product.entity';

@Injectable()
export default class ProductsService {
	constructor(
		@InjectRepository(ProductEntity)
		readonly repository: Repository<ProductEntity>,
	) {}

	async list(): Promise<ProductEntity[]> {
		return await this.repository.find({
			deleted_at: null,
		});
	}

	async create(data: CreateProductDto): Promise<ProductEntity> {
		await this.failIfSlugExists(data.slug);
		return await this.repository.save(data);
	}

	async findOne(id: number): Promise<ProductEntity> {
		const product = await this.repository.findOne({ id });

		if (!product) {
			throw new NotFoundException();
		}

		return product;
	}

	async update(id: number, data: UpdateProductDto): Promise<ProductEntity> {
		let product = await this.findOne(id);

		await this.failIfSlugExists(data.slug, id);

		product = this.repository.merge(product, data);

		return await this.repository.save(product);
	}

	async remove(id: number): Promise<void> {
		const product = await this.findOne(id);

		await this.repository.save({ ...product, deleted_at: new Date() });
	}

	private async failIfSlugExists(
		slug: string,
		ignore?: number,
	): Promise<void> {
		let exists;

		if (ignore) {
			exists = await this.repository.findOne({
				where: { slug, id: Not(ignore) },
			});
		} else {
			exists = await this.repository.findOne({ slug });
		}

		if (exists) {
			throw new BadRequestException({
				status: 400,
				errors: ['Email is Already in Use'],
				error: 'Bad Request',
			});
		}
	}
}
