import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductVariantsService from './product_variants.service';
import ProductVariantsController from './product_variants.controller';
import VariantEntity from '../../../entities/product_variant/product_variant.entity';

@Module({
	imports: [TypeOrmModule.forFeature([VariantEntity])],
	controllers: [ProductVariantsController],
	providers: [ProductVariantsService],
})
export default class ProductVariantsModule {}
