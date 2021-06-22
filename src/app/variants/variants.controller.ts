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
import VariantsService from './variants.service';
import CreateVariantDto from './dto/create-variant.dto';
import UpdateVariantDto from './dto/update-variant.dto';
import LocalAuthGuard from '../../common/guards/auth.guard';

@Controller('/variants')
export default class VariantsController {
	constructor(private readonly variantsService: VariantsService) {}

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
