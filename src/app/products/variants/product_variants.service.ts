import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import CreateVariantDto from './dto/create-variant.dto';
import UpdateVariantDto from './dto/update-variant.dto';
import VariantEntity from '../../../entities/product_variant/product_variant.entity';

@Injectable()
export default class ProductVariantsService {
	constructor(
		@InjectRepository(VariantEntity)
		readonly repository: Repository<VariantEntity>,
	) {}

	async index(): Promise<VariantEntity[]> {
		return await this.repository.find({
			deleted_at: null,
		});
	}

	async create(data: CreateVariantDto): Promise<VariantEntity> {
		return await this.repository.save(data);
	}

	async findOne(id: number): Promise<VariantEntity> {
		const variant = await this.repository.findOne({ id });

		if (!variant) {
			throw new NotFoundException();
		}

		return variant;
	}

	async update(id: number, data: UpdateVariantDto): Promise<VariantEntity> {
		let variant = await this.findOne(id);

		variant = this.repository.merge(variant, data);

		return this.repository.save(variant);
	}

	async remove(id: number): Promise<void> {
		const variant = await this.findOne(id);

		await this.repository.save({ ...variant, deleted_at: new Date() });
	}
}
