import { Not, Repository } from 'typeorm';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateCategoryDto from './dto/create-category.dto';
import UpdateCategoryDto from './dto/update-category.dto';
import CategoryEntity from '../../entities/category/category.entity';

@Injectable()
export default class CategoriesService {
	constructor(
		@InjectRepository(CategoryEntity)
		readonly repository: Repository<CategoryEntity>,
	) {}

	async list(): Promise<CategoryEntity[]> {
		return await this.repository.find({
			withDeleted: false,
			relations: ['products'],
		});
	}

	async create(data: CreateCategoryDto): Promise<CategoryEntity> {
		await this.failIfSlugExists(data.slug);

		return await this.repository.save(data);
	}

	async findOne(id: number): Promise<CategoryEntity> {
		const category = await this.repository.findOne({ id });

		if (!category) {
			throw new NotFoundException();
		}

		return category;
	}

	async update(id: number, data: UpdateCategoryDto): Promise<CategoryEntity> {
		let category = await this.findOne(id);

		await this.failIfSlugExists(data.slug, id);

		category = this.repository.merge(category, data);

		return await this.repository.save(category);
	}

	async remove(id: number): Promise<void> {
		const category = await this.findOne(id);

		await this.repository.save({ ...category, deleted_at: new Date() });
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
				errors: ['Slug is Already in Use'],
				error: 'Bad Request',
			});
		}
	}
}
