import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoriesService from './categories.service';
import CategoriesController from './categories.controller';
import CategoryEntity from '../../entities/category/category.entity';
import ProductEntity from '../../entities/product/product.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity])],
	controllers: [CategoriesController],
	providers: [CategoriesService],
})
export default class CategoriesModule {}
