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
import ProductsService from './products.service';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';

@Controller('products')
export default class ProductsController {
	constructor(private readonly service: ProductsService) {}

	@Get('/')
	@HttpCode(200)
	index() {
		return this.service.list();
	}

	@Post('/')
	@HttpCode(201)
	create(@Body() data: CreateProductDto) {
		return this.service.create(data);
	}

	@Get('/:id')
	@HttpCode(200)
	show(@Param('id') id: number) {
		return this.service.findOne(+id);
	}

	@Patch('/:id')
	@HttpCode(200)
	update(@Param('id') id: number, @Body() data: UpdateProductDto) {
		return this.service.update(+id, data);
	}

	@Delete('/:id')
	@HttpCode(200)
	remove(@Param('id') id: number) {
		return this.service.remove(+id);
	}
}
