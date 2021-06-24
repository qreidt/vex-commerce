import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateCategoryDto {
	@IsNumber()
	category_id: number;

	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	slug: string;
}
