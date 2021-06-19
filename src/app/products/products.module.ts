import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductsService from './products.service';
import ProductsController from './products.controller';
import ProductEntity from '../../entities/product/product.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ProductEntity])],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export default class ProductsModule {}
