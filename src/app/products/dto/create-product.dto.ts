import { IsNotEmpty } from 'class-validator';

export default class CreateProductDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	slug: string;
}
