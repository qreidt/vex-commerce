import { IsNotEmpty } from 'class-validator';

export default class UpdateCategoryDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	slug: string;
}
