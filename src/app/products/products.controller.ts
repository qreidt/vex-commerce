import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	UseInterceptors,
	ClassSerializerInterceptor,
	UseGuards,
} from '@nestjs/common';
import ProductsService from './products.service';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import LocalAuthGuard from '../../common/guards/auth.guard';

@Controller('products')
export default class ProductsController {
	constructor(private readonly service: ProductsService) {}

	@UseGuards(LocalAuthGuard)
	@Get('/')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	index() {
		return this.service.list();
	}

	@UseGuards(LocalAuthGuard)
	@Post('/')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(201)
	create(@Body() data: CreateProductDto) {
		return this.service.create(data);
	}

	@UseGuards(LocalAuthGuard)
	@Get('/:id')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	show(@Param('id') id: number) {
		return this.service.findOne(+id);
	}

	@UseGuards(LocalAuthGuard)
	@Patch('/:id')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	update(@Param('id') id: number, @Body() data: UpdateProductDto) {
		return this.service.update(+id, data);
	}

	@UseGuards(LocalAuthGuard)
	@Delete('/:id')
	@UseInterceptors(ClassSerializerInterceptor)
	@HttpCode(200)
	remove(@Param('id') id: number) {
		return this.service.remove(+id);
	}
}
