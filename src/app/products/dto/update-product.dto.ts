import { PartialType } from '@nestjs/mapped-types';
import CreateProductDto from './create-product.dto';

export default class UpdateProductDto extends PartialType(CreateProductDto) {
	name: string;
	slug: string;
}
