import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
} from '@nestjs/common';
import VariantsService from './variants.service';
import CreateVariantDto from './dto/create-variant.dto';
import UpdateVariantDto from './dto/update-variant.dto';

@Controller('/variants')
export default class VariantsController {
	constructor(private readonly variantsService: VariantsService) {}

	@Get('/')
	@HttpCode(200)
	index() {
		return this.variantsService.index();
	}

	@Post('/')
	@HttpCode(201)
	create(@Body() data: CreateVariantDto) {
		return this.variantsService.create(data);
	}

	@Get('/:id')
	@HttpCode(200)
	show(@Param('id') id: number) {
		return this.variantsService.findOne(+id);
	}

	@Patch('/:id')
	@HttpCode(200)
	update(@Param('id') id: number, @Body() data: UpdateVariantDto) {
		return this.variantsService.update(+id, data);
	}

	@Delete('/:id')
	@HttpCode(200)
	remove(@Param('id') id: number) {
		return this.variantsService.remove(+id);
	}
}
