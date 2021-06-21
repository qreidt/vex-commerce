import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import VariantsService from './variants.service';
import VariantsController from './variants.controller';
import VariantEntity from '../../entities/variant/variant.entity';

@Module({
	imports: [TypeOrmModule.forFeature([VariantEntity])],
	controllers: [VariantsController],
	providers: [VariantsService],
})
export default class VariantsModule {}
