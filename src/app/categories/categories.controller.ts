import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import CategoriesService from './categories.service';
import CreateCategoryDto from './dto/create-category.dto';
import UpdateCategoryDto from './dto/update-category.dto';

@Controller('/categories')
export default class CategoriesController {
	constructor(private readonly service: CategoriesService) {}

	@Get('/')
	index() {
		return this.service.list();
	}

	@Post('/')
	create(@Body() data: CreateCategoryDto) {
		return this.service.create(data);
	}

	@Get('/:id')
	show(@Param('id') id: number) {
		return this.service.findOne(+id);
	}

	@Patch('/:id')
	update(@Param('id') id: number, @Body() data: UpdateCategoryDto) {
		return this.service.update(+id, data);
	}

	@Delete('/:id')
	remove(@Param('id') id: number) {
		return this.service.remove(+id);
	}
}
