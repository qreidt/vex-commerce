import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateVariantDto from './dto/create-variant.dto';
import UpdateVariantDto from './dto/update-variant.dto';
import VariantEntity from '../../entities/variant/variant.entity';

@Injectable()
export default class VariantsService {
	constructor(
		@InjectRepository(VariantEntity)
		readonly repository: Repository<VariantEntity>,
	) {}

	create(create_dto: CreateVariantDto) {
		return 'This action adds a new variant';
	}

	findAll() {
		return `This action returns all variants`;
	}

	findOne(id: number) {
		return `This action returns a #${id} variant`;
	}

	update(id: number, update_dto: UpdateVariantDto) {
		return `This action updates a #${id} variant`;
	}

	remove(id: number) {
		return `This action removes a #${id} variant`;
	}
}
