import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
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

	list(): string {
		return `This action returns all products`;
	}

	create(data: CreateProductDto): string {
		return 'This action adds a new product';
	}

	findOne(id: number): string {
		return `This action returns a #${id} product`;
	}

	update(id: number, data: UpdateProductDto): string {
		return `This action updates a #${id} product`;
	}

	remove(id: number): string {
		return `This action removes a #${id} product`;
	}
}
