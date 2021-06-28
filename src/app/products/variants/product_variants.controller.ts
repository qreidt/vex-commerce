import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	UseGuards,
	UseInterceptors,
	ClassSerializerInterceptor,
} from '@nestjs/common';
import CreateVariantDto from './dto/create-variant.dto';
import UpdateVariantDto from './dto/update-variant.dto';
import LocalAuthGuard from '../../../common/guards/auth.guard';
import ProductVariantsService from './product_variants.service';

@Controller('/variants')
export default class ProductVariantsController {
	constructor(private readonly variantsService: ProductVariantsService) {}

	@UseGuards(LocalAuthGuard)
	@Get('/')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	index() {
		return this.variantsService.index();
	}

	@UseGuards(LocalAuthGuard)
	@Post('/')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(201)
	create(@Body() data: CreateVariantDto) {
		return this.variantsService.create(data);
	}

	@UseGuards(LocalAuthGuard)
	@Get('/:id')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	show(@Param('id') id: number) {
		return this.variantsService.findOne(+id);
	}

	@UseGuards(LocalAuthGuard)
	@Patch('/:id')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	update(@Param('id') id: number, @Body() data: UpdateVariantDto) {
		return this.variantsService.update(+id, data);
	}

	@UseGuards(LocalAuthGuard)
	@Delete('/:id')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	remove(@Param('id') id: number) {
		return this.variantsService.remove(+id);
	}
}
